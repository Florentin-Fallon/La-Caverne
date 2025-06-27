namespace LaCaverneBackend.Database.Models;

public class Article
{
    public uint Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public Seller Seller { get; set; }
    public TagArticle[] Tags { get; set; }
    public bool IsParrotSelection { get; set; }
}