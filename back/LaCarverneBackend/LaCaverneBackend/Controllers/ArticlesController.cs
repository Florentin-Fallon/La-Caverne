using LaCaverneBackend.Database;
using LaCaverneBackend.Database.Models;
using LaCaverneBackend.Dto;
using Microsoft.AspNetCore.Mvc;

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
        return _db.Articles.Take(pageCount).Select(art => new ArticleDto(art));
    }
}