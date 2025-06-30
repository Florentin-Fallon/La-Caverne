namespace LaCaverneBackend.Database.Models;

public class TagAccount
{
    public uint Id { get; set; }
    public Account Account { get; set; }
    public Tag Tag { get; set; }
}