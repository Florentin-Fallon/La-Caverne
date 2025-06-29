using LaCaverneBackend.Database;
using LaCaverneBackend.Database.Models;
using LaCaverneBackend.Dto;
using LaCaverneBackend.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LaCaverneBackend.Controllers;

[ApiController]
[Route("sellers")]
public class SellersController : ControllerBase
{
    private LaCaverneDbContext _db;

    public SellersController(LaCaverneDbContext db)
    {
        _db = db;
    }

    [HttpPost("create")]
    [Authorize]
    public object CreateSeller([FromBody] SellerCreationDto dto)
    {
        Account? account = User.Account(_db);
        if (account == null) return Unauthorized();
        
        if (_db.Sellers.Include(seller => seller.Account).Any(seller => seller.Account.Id == account.Id))
            return BadRequest("a seller profile is already associated with this account");
        
        if (string.IsNullOrWhiteSpace(dto.Name) || dto.Name.Length > 30)
            return BadRequest("name must not be empty and less than 30 characters long");
        if (string.IsNullOrWhiteSpace(dto.Description) || dto.Description.Length > 500)
            return BadRequest("description must not be empty and less than 500 characters long");

        Seller seller = new()
        {
            Account = account,
            Name = dto.Name,
            Description = dto.Description
        };
        _db.Sellers.Add(seller);
        _db.SaveChanges();

        return Created($"/sellers/{seller.Id}", new SellerDto(seller));
    }

    [HttpGet("{id:int}")]
    public object GetSeller(uint id)
    {
        Seller? seller = _db.Sellers.Find(id);
        if (seller == null) return NotFound();

        return new SellerDto(seller);
    }

    [HttpGet("mine")]
    public object GetAccountSeller()
    {
        Account? account = User.Account(_db);
        if (account == null) return Unauthorized();
        
        Seller? seller = _db.Sellers.Include(seller => seller.Account).FirstOrDefault(seller => seller.Account.Id == account.Id);
        if (seller == null) return NotFound("your account does not have a seller profile");

        return new SellerDto(seller);
    }
}