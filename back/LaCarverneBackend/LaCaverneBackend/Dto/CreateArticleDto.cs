namespace LaCaverneBackend.Dto;

public class CreateArticleDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string[] Tags { get; set; }
    public double Price { get; set; }
}