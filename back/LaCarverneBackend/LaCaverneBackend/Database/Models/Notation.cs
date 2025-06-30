namespace LaCaverneBackend.Database.Models;

public class Notation
{
    public int Id { get; set; }
    public byte Stars { get; set; }
    public Article? Article { get; set; }
    public Seller? Seller { get; set; }
    public Account Account { get; set; }
    public string? Description { get; set; }
}