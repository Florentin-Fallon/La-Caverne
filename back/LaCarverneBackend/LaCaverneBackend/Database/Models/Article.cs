namespace LaCaverneBackend.Database.Models;

public class Article
{
    public uint Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public Seller Seller { get; set; }
    public ICollection<TagArticle> Tags { get; set; }
    public ICollection<Notation> Notations { get; set; }
    public bool IsParrotSelection { get; set; }
    public double Price { get; set; }
    public int ImageCount { get; set; }
    public ICollection<Like> Likes { get; set; }
}