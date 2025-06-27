using LaCaverneBackend.Database;
using LaCaverneBackend.Database.Models;
using LaCaverneBackend.Dto;
using LaCaverneBackend.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace LaCaverneBackend.Controllers;

[Route("account")]
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
        if (_db.Accounts.Any(account => account.Email == dto.Email))
            return BadRequest("an account with this email already exists");
        if (dto.Password != dto.ConfirmPassword)
            return BadRequest("passwords do not match");
        if (!AccountUtilities.ValidatePassword(dto.Password))
            return BadRequest("invalid password: must be at least 8 characters long, contain at least two digits, and at least one letter");

        Account account = new Account
        {
            Email = dto.Email,
            Username = dto.Email.Split('@')[0], // Use the part before '@' as username
        };
        account.SetPassword(dto.Password);

        _db.Accounts.Add(account);
        _db.SaveChanges();

        return Ok(new AccountDto(account));
    }
}