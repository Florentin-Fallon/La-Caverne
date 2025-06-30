namespace LaCaverneBackend.Database.Models;

public class Like
{
    public int Id { get; set; }
    public Account Account { get; set; }
    public Article Article { get; set; }
}