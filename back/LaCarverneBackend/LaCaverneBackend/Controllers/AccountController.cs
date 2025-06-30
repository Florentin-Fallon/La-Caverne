using System.Security.Claims;
using LaCaverneBackend.Database;
using LaCaverneBackend.Database.Models;
using LaCaverneBackend.Dto;
using LaCaverneBackend.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LaCaverneBackend.Controllers;

[ApiController]
[Route("accounts")]
public class AccountController : ControllerBase
{
    private LaCaverneDbContext _db;

    public AccountController(LaCaverneDbContext db)
    {
        _db = db;
    }
    
    [HttpPost]
    public object CreateAccount([FromBody] CreateAccountDto dto)
    {
        if (!dto.Email.Contains('@'))
            return BadRequest("invalid email address");
        if (_db.Accounts.Any(account => account.Email == dto.Email))
            return BadRequest("an account with this email already exists");
        if (dto.Password != dto.ConfirmPassword)
            return BadRequest("passwords do not match");
        if (!AccountUtilities.ValidatePassword(dto.Password))
            return BadRequest("invalid password: must be at least 8 characters long, contain at least one digit, and one letter");

        Account account = new Account
        {
            Email = dto.Email,
            Username = dto.Email.Split('@')[0], // Use the part before '@' as username
        };
        account.SetPassword(dto.Password);

        _db.Accounts.Add(account);
        _db.SaveChanges();

        return Ok(new AccountLoginResponseDto(account, account.CreateToken(_db)));
    }
    
    [Authorize]
    [HttpGet("account")]
    public object GetLoggedInAccount()
    {
        return Ok(new AccountDto(User.Account(_db)));
    }

    [HttpPost("login")]
    public object Login([FromBody] LoginAccountDto dto)
    {
        if (!dto.Email.Contains('@'))
            return BadRequest("invalid email address");

        Account? account = _db.Accounts.FirstOrDefault(account => account.Email == dto.Email);
        if (account == null || !account.CheckPassword(dto.Password))
            return BadRequest("account does not exist or password is incorrect");

        string token = account.CreateToken(_db);
        return new AccountLoginResponseDto(account, token);
    }
    
    [Authorize]
    [HttpPost("account/password")]
    public object ChangePassword([FromBody] ChangePasswordDto dto)
    {
        if (!dto.NewPassword.Equals(dto.ConfirmNewPassword))
            return BadRequest("new passwords do not match");
        if (!AccountUtilities.ValidatePassword(dto.NewPassword))
            return BadRequest("invalid password: must be at least 8 characters long, contain at least one digit, and one letter");

        Account? account = User.Account(_db);

        if (!account.CheckPassword(dto.CurrentPassword))
            return BadRequest("current password is incorrect");

        account.SetPassword(dto.NewPassword);
        account.RevokeTokens(_db, false);
        _db.SaveChanges();
        
        string newToken = account.CreateToken(_db);

        return Ok(new AccountLoginResponseDto(account, newToken));
    }

    [Authorize]
    [HttpPost("logout")]
    public object Logout()
    {
        Account? account = User.Account(_db);
        account?.RevokeTokens(_db);

        return account == null ? BadRequest() : NoContent();
    }
}