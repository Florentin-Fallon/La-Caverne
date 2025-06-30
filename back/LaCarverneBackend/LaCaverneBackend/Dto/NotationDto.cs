using LaCaverneBackend.Database.Models;

namespace LaCaverneBackend.Dto;

public class NotationDto(Notation notation)
{
    public int Id { get; set; } = notation.Id;
    public byte Stars { get; set; } = notation.Stars;
    public uint? ArticleId { get; set; } = notation.Article?.Id;
    public uint? SellerId { get; set; } = notation.Seller?.Id;
    public string? Description { get; set; } = notation.Description;
    public string? Username { get; set; } = notation.Account?.Username ?? "Utilisateur Inconnu";
}