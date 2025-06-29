using LaCaverneBackend.Database;
using LaCaverneBackend.Database.Models;
using LaCaverneBackend.Dto;
using LaCaverneBackend.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LaCaverneBackend.Controllers;

[ApiController]
[Route("articles")]
public class ArticlesController : ControllerBase
{
    private LaCaverneDbContext _db;

    public ArticlesController(LaCaverneDbContext db)
    {
        _db = db;
    }
    
    [HttpGet]
    public object Get(int page, int pageCount = 10)
    {
        return _db.Articles.Take(pageCount)
            .Include(art => art.Seller)
            .Include(art => art.Tags)
            .Select(art => new ArticleDto(art, _db.TagArticles
                .Include(tag => tag.Article)
                .Include(tag => tag.Tag)
                .Where(tag => tag.Article.Id == art.Id)
                .ToArray()));
    }

    [HttpGet("{id:int}")]
    public object GetArticle(uint id)
    {
        ArticleDto? article = _db.Articles.Where(art => art.Id == id)
            .Include(art => art.Seller)
            .Include(art => art.Tags)
            .Select(art => new ArticleDto(art, _db.TagArticles
                .Include(tag => tag.Article)
                .Include(tag => tag.Tag)
                .Where(tag => tag.Article.Id == art.Id)
                .ToArray())).FirstOrDefault();

        if (article == null) return NotFound();

        return article;
    }

    [HttpPut("{id:int}")]
    [Authorize]
    public object ModifyArticle(uint id, [FromBody] CreateArticleDto dto)
    {
        Account? account = User.Account(_db);
        if (account == null) return Unauthorized();

        Seller? seller = account.GetSellerProfile(_db);
        if (seller == null) return BadRequest("this account does not have a seller profile");

        Article? article = _db.Articles.Include(art => art.Seller).FirstOrDefault(art => art.Id == id);
        if (article == null || article.Seller.Id != seller.Id) return NotFound();

        if (!string.IsNullOrWhiteSpace(dto.Title))
        {
            if (dto.Title.Length > 50)
                return BadRequest("title must be less than 50 characters long");

            article.Title = dto.Title;
        }
        if (!string.IsNullOrWhiteSpace(dto.Description))
        {
            if (dto.Description.Length > 1000)
                return BadRequest("description must be less than 1000 characters long");

            article.Description = dto.Description;
        }
        if (dto.Price != 0)
        {
            if (dto.Price <= 0 && dto.Price < 1000000)
                return BadRequest("price must be greater than zero and less than a million");

            article.Price = dto.Price;
        }
        if (dto.Tags.Length > 0)
        {
            _db.TagArticles.RemoveRange(_db.TagArticles.Include(tag => tag.Article).Where(tag => tag.Article.Id == article.Id));
            
            List<Tag> tags = [];
            foreach (string tag in dto.Tags)
            {
                string safeTag = tag.ToLower();
                Tag? dbTag = _db.Tags.FirstOrDefault(t => t.Name == safeTag);
                if (dbTag != null) tags.Add(dbTag);
                else
                {
                    dbTag = new Tag { Name = tag.ToLower() };
                    _db.Tags.Add(dbTag);
                    tags.Add(dbTag);
                }
            }
            
            foreach (Tag tag in tags)
                _db.TagArticles.Add(new TagArticle() { Article = article, Tag = tag });
        }

        _db.SaveChanges();

        return new ArticleDto(article, _db.TagArticles.Include(tag => tag.Article).Include(tag => tag.Tag).Where(tag => tag.Article.Id == article.Id).ToArray());
    }

    [HttpPost]
    [Authorize]
    public object CreateArticle([FromBody] CreateArticleDto dto)
    {
        Account? account = User.Account(_db);
        if (account == null) return Unauthorized();

        Seller? seller = account.GetSellerProfile(_db);
        if (seller == null) return BadRequest("this account does not have a seller profile");
        
        if (string.IsNullOrWhiteSpace(dto.Title) || dto.Title.Length > 50)
            return BadRequest("title must not be empty and less than 50 characters long");
        if (string.IsNullOrWhiteSpace(dto.Description) || dto.Description.Length > 1000)
            return BadRequest("description must not be empty and less than 1000 characters long");
        if (dto.Tags.Length < 1 || dto.Tags.Length > 10)
            return BadRequest("you need to have at least 1 tag and less than 10 tags");
        if (dto.Price <= 0 || dto.Price > 1000000)
            return BadRequest("price must be superior than zero and less than a million");

        List<Tag> tags = [];
        foreach (string tag in dto.Tags)
        {
            string safeTag = tag.ToLower();
            Tag? dbTag = _db.Tags.FirstOrDefault(t => t.Name == safeTag);
            if (dbTag != null) tags.Add(dbTag);
            else
            {
                dbTag = new Tag { Name = tag.ToLower() };
                _db.Tags.Add(dbTag);
                tags.Add(dbTag);
            }
        }

        Article article = new Article()
        {
            Title = dto.Title,
            Description = dto.Description,
            IsParrotSelection = false,
            Seller = seller,
            Price = dto.Price
        };

        _db.Articles.Add(article);

        foreach (Tag tag in tags)
            _db.TagArticles.Add(new TagArticle() { Article = article, Tag = tag });

        _db.SaveChanges();

        return Created($"/articles/{article.Id}", new ArticleDto(article));
    }
}