using System.Security.Claims;
using System.Text.RegularExpressions;
using LaCaverneBackend.Database;
using LaCaverneBackend.Database.Models;
using LaCaverneBackend.Dto;
using LaCaverneBackend.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    
    [HttpGet]
    [Authorize]
    public object GetAccounts()
    {
        Account account = User.Account(_db)!;
        if (account == null || !account.IsAdmin)
            return Unauthorized();
        
        return _db.Accounts.Select(account => new SellerInfosAccountDto(account, _db.Sellers.Include(seller => seller.Account).Any(seller => seller.Account.Id == account.Id)));
    }
    
    [HttpDelete("{id:int}")]
    [Authorize]
    public object DeleteAccount(uint id)
    {
        Account account = User.Account(_db)!;
        if (account == null || !account.IsAdmin)
            return Unauthorized();
        
        Account? accountToDelete = _db.Accounts.Find(id);
        if (accountToDelete == null)
            return NotFound("account not found");
        
        if (accountToDelete.IsAdmin)
            return BadRequest("you cannot delete an admin account");

        Seller? seller = _db.Sellers.Include(seller => seller.Account).FirstOrDefault(seller => seller.Account.Id == accountToDelete.Id);
        if (seller != null)
        {
            foreach (Article art in _db.Articles.Include(art => art.Seller).Where(art => art.Seller.Id == seller.Id).ToArray())
            {
                _db.TagArticles.RemoveRange(_db.TagArticles.Include(art => art.Article).Where(art => art.Article.Id == art.Id));
                _db.Likes.RemoveRange(_db.Likes.Include(like => like.Article).Where(like => like.Article.Id == art.Id));
                _db.Notations.RemoveRange(_db.Notations.Include(notation => notation.Article).Where(notation => notation.Article != null && notation.Article.Id == art.Id));
                
                _db.Articles.Remove(art);
            }
            
            _db.Sellers.Remove(seller);
        }
        
        _db.Tokens.RemoveRange(_db.Tokens.Include(token => token.Account).Where(token => token.Account.Id == accountToDelete.Id));
        _db.Accounts.Remove(accountToDelete);
        _db.SaveChanges();

        return NoContent();
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

        return Ok(new AccountLoginResponseDto(account, false, account.CreateToken(_db)));
    }
    
    [Authorize]
    [HttpGet("account")]
    public object GetLoggedInAccount()
    {
        Account account = User.Account(_db)!;
        
        return Ok(new SellerInfosAccountDto(account, _db.Sellers.Include(seller => seller.Account).Any(seller => seller.Account.Id == account.Id)));
    }
    
    [Authorize]
    [HttpPut("account")]
    public object ModifyLoggedInAccount([FromBody] ModifyAccountDto dto)
    {
        Account? account = User.Account(_db);
        if (account == null) return Unauthorized();

        Regex phoneNumberRegex = new(@"^(\+33|0)[1-9](\d{2}){4}$");

        if (!string.IsNullOrWhiteSpace(dto.Username))
        {
            if (dto.Username.Length < 1 || dto.Username.Length > 20)
                return BadRequest("username must be between 1 and 20 characters long");
            
            account.Username = dto.Username;
        }
        if (!string.IsNullOrWhiteSpace(dto.FirstName))
        {
            if (dto.FirstName.Length < 1 || dto.FirstName.Length > 40)
                return BadRequest("first name must be between 1 and 40 characters long");
            
            account.FirstName = dto.FirstName;
        }
        if (!string.IsNullOrWhiteSpace(dto.LastName))
        {
            if (dto.LastName.Length < 1 || dto.LastName.Length > 40)
                return BadRequest("last name must be between 1 and 40 characters long");
            
            account.LastName = dto.LastName;
        }
        if (!string.IsNullOrWhiteSpace(dto.PhoneNumber))
        {
            if (!phoneNumberRegex.IsMatch(dto.PhoneNumber))
                return BadRequest("invalid phone number, must be +33123456789 or 0123456789 without spaces");
            
            account.PhoneNumber = dto.PhoneNumber;
        }
        if (!string.IsNullOrWhiteSpace(dto.Address))
        {
            if (dto.Address.Length < 1 || dto.Address.Length > 100)
                return BadRequest("address must be between 1 and 100 characters long");
            
            account.Address = dto.Address;
        }
        if (dto.PostalCode != null)
        {
            if (dto.PostalCode > 99999)
                return BadRequest("postal code must be lower or equal to 99999");
            
            account.PostalCode = dto.PostalCode!.Value;
        }
        if (!string.IsNullOrWhiteSpace(dto.CityName))
        {
            if (dto.CityName.Length < 1 || dto.CityName.Length > 70)
                return BadRequest("city name must be between 1 and 70 characters long");
            
            account.CityName = dto.CityName;
        }

        _db.SaveChanges();
        return new AccountDto(account, true);
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
        return new AccountLoginResponseDto(account, _db.Sellers.Include(seller =>  seller.Account).Any(seller => seller.Account.Id == account.Id), token);
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

        return Ok(new AccountLoginResponseDto(account, _db.Sellers.Include(seller =>  seller.Account).Any(seller => seller.Account.Id == account.Id), newToken));
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