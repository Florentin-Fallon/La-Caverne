using LaCaverneBackend.Database.Models;

namespace LaCaverneBackend.Dto;

public class CategoryDto(Category category)
{
    public int Id { get; set; } = category.Id;
    public string Name { get; set; } = category.Name;
}