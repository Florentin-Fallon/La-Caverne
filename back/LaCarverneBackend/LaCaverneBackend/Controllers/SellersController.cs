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

    [HttpGet]
    public object GetSellers()
    {
        return _db.Sellers.Select(seller => new SellerDto(seller));
    }

    [HttpGet("{id:int}")]
    public object GetSeller(uint id)
    {
        Seller? seller = _db.Sellers.Find(id);
        if (seller == null) return NotFound();

        return new SellerDto(seller);
    }

    [HttpGet("{id:int}/articles")]
    public object GetSellerArticles(uint id)
    {
        Seller? seller = _db.Sellers.Find(id);
        if (seller == null) return NotFound();
        
        Article[] articles = _db.Articles
            .Include(art => art.Seller)
            .Where(art => art.Seller.Id == seller.Id)
            .Include(art => art.Tags)
            .Include(art => art.Notations)
            .Include(art => art.Likes)
            .Include(art => art.Category)
            .ToArray();

        return articles.Select(art => new ArticleDto(art, _db.TagArticles
            .Include(tag => tag.Article)
            .Include(tag => tag.Tag)
            .Where(tag => tag.Article.Id == art.Id)
            .ToArray()));
    }

    [HttpGet("me/articles")]
    [Authorize]
    public object GetCurrentSellerArticles()
    {
        Account? account = User.Account(_db);
        if (account == null) return Unauthorized();

        Seller? seller = _db.Sellers.Include(seller => seller.Account)
            .FirstOrDefault(seller => seller.Account.Id == account.Id);
        
        if (seller == null) return NotFound();
        
        Article[] articles = _db.Articles
            .Include(art => art.Seller)
            .Where(art => art.Seller.Id == seller.Id)
            .Include(art => art.Tags)
            .Include(art => art.Notations)
            .Include(art => art.Likes)
            .Include(art => art.Category)
            .ToArray();

        return articles.Select(art => new ArticleDto(art, _db.TagArticles
            .Include(tag => tag.Article)
            .Include(tag => tag.Tag)
            .Where(tag => tag.Article.Id == art.Id)
            .ToArray()));
    }

    [HttpGet("me")]
    public object GetAccountSeller()
    {
        Account? account = User.Account(_db);
        if (account == null) return Unauthorized();
        
        Seller? seller = _db.Sellers.Include(seller => seller.Account).FirstOrDefault(seller => seller.Account.Id == account.Id);
        if (seller == null) return NotFound("your account does not have a seller profile");

        return new SellerDto(seller);
    }

    [HttpPut("me")]
    public object ModifyAccountSeller([FromBody] SellerCreationDto dto)
    {
        Account? account = User.Account(_db);
        if (account == null) return Unauthorized();
        
        Seller? seller = _db.Sellers.Include(seller => seller.Account).FirstOrDefault(seller => seller.Account.Id == account.Id);
        if (seller == null) return NotFound("your account does not have a seller profile");

        if (!string.IsNullOrWhiteSpace(dto.Name))
        {
            if (dto.Name.Length > 30)
                return BadRequest("name must be less than 30 characters long");

            seller.Name = dto.Name;
        }
        if (!string.IsNullOrWhiteSpace(dto.Description))
        {
            if (dto.Description.Length > 500)
                return BadRequest("description must be less than 500 characters long");
            
            seller.Description = dto.Description;
        }

        _db.SaveChanges();

        return new SellerDto(seller);
    }
}