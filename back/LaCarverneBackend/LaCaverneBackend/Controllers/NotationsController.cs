using LaCaverneBackend.Database;
using LaCaverneBackend.Database.Models;
using LaCaverneBackend.Dto;
using LaCaverneBackend.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LaCaverneBackend.Controllers;

[ApiController]
[Route("notations")]
public class NotationsController : ControllerBase
{
    private LaCaverneDbContext _db;

    public NotationsController(LaCaverneDbContext db)
    {
        _db = db;
    }

    [HttpGet("{id:int}")]
    public object GetNotation(uint id)
    {
        Notation? notation = _db.Notations.Include(not => not.Article).Include(not => not.Seller)
            .FirstOrDefault(not => not.Id == id);

        return notation == null ? NotFound() : new NotationDto(notation);
    }
    
    [HttpPost("articles/{id:int}")]
    [Authorize]
    public object CreateArticleNotation(uint id, CreateNotationDto dto)
    {
        Account? account = User.Account(_db);
        if (account == null) return Unauthorized();

        Article? article = _db.Articles.Include(art => art.Seller).FirstOrDefault(art => art.Id == id);
        if (article == null) return NotFound();

        if (_db.Notations.Include(not => not.Article)
            .Include(not => not.Account)
            .Any(not => not.Article != null && not.Article.Id == id && not.Account.Id == account.Id))
            return BadRequest("this account already noted this article");

        if (dto.Notation < 1 || dto.Notation > 5)
            return BadRequest("notation must be between 1 and 5 included");
        
        Notation notation = new Notation()
        {
            Account = account,
            Article = article,
            Description = string.IsNullOrWhiteSpace(dto.Text) ? string.Empty : dto.Text,
            Stars = (byte)dto.Notation
        };
        _db.Notations.Add(notation);
        _db.SaveChanges();

        return Created($"/notations/{notation.Id}", new NotationDto(notation));
    }

    [HttpGet("articles/{id:int}")]
    public object GetArticleNotations(uint id)
    {
        return _db.Notations
            .Include(not => not.Article)
            .Include(not => not.Account)
            .Where(not => not.Article != null && not.Article.Id == id)
            .Select(not => new NotationDto(not));
    }

    [HttpGet("articles/{id:int}/overall")]
    public object GetArticleOverallNotation(uint id)
    {
        Notation[] notations = _db.Notations.Include(not => not.Article)
            .Where(not => not.Article != null && not.Article.Id == id)
            .ToArray();

        if (notations.Length == 0) 
            return new OverallNotationDto(false, 0, 0);

        int notationsSum = 0;
        foreach (Notation notation in notations)
            notationsSum += notation.Stars;
        notationsSum /= notations.Length;
        
        return new OverallNotationDto(true, notationsSum, notations.Length);
    }
}