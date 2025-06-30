using LaCaverneBackend.Database.Models;

namespace LaCaverneBackend.Dto;

public class ArticleDto(Article article, TagArticle[]? tags = null)
{
    public uint Id { get; set; } = article.Id;
    public string Title { get; set; } = article.Title;
    public string Description { get; set; } = article.Description;
    public double Price { get; set; } = article.Price;
    public SellerDto Seller { get; set; } = new(article.Seller);
    public string[] Tags { get; set; } = article.Tags == null ? tags.Select(tag => tag.Tag.Name).ToArray() : article.Tags.Select(tag => tag.Tag.Name).ToArray();
    public bool Parrot { get; set; } = article.IsParrotSelection;
    public int ImageCount { get; set; } = article.ImageCount;
    public int Likes => article.Likes?.Count ?? 0;
    public int Notation => article.Notations == null || article.Notations.Count == 0 ? 0 : article.Notations.Sum(art => art.Stars) / article.Notations.Count;
    public string Category => article.Category?.Name ?? "Divers";
}