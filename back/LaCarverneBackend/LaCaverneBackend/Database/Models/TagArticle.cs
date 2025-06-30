namespace LaCaverneBackend.Database.Models;

public class TagArticle
{
    public uint Id { get; set; }
    public Article Article { get; set; }
    public Tag Tag { get; set; }
}