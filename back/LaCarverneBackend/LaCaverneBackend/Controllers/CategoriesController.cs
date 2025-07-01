using LaCaverneBackend.Database;
using LaCaverneBackend.Database.Models;
using LaCaverneBackend.Dto;
using LaCaverneBackend.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LaCaverneBackend.Controllers;

[ApiController]
[Route("categories")]
public class CategoriesController : ControllerBase
{
    private LaCaverneDbContext _db;

    public CategoriesController(LaCaverneDbContext db)
    {
        _db = db;
    }
    
    [HttpGet]
    public object GetCategories()
    {
        return _db.Categories.Select(cat => new CategoryDto(cat));
    }
    
    [HttpGet("{id}")]
    public object GetCategory(uint id)
    {
        Category? cat = _db.Categories.Find(id);
        
        return cat == null ? NotFound() : new CategoryDto(cat);
    }

    [HttpPost]
    [Authorize]
    public object CreateCategory([FromBody] CreateCategoryDto dto)
    {
        Account? account = User.Account(_db);
        if (account == null || !account.IsAdmin) 
            return Unauthorized();
        
        if (_db.Categories.Any(cat => cat.Name.ToLower() == dto.Name.ToLower()))
            return BadRequest("a category with that name already exist");
        if (string.IsNullOrWhiteSpace(dto.Name) || dto.Name.Length > 30)
            return BadRequest("name must not be empty and less than 30 characters long");

        Category cat = new Category
        {
            Name = dto.Name
        };

        _db.Categories.Add(cat);
        _db.SaveChanges();

        return new CategoryDto(cat);
    }
}