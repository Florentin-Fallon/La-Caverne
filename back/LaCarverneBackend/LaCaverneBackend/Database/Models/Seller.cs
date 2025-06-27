namespace LaCaverneBackend.Database.Models;

public class Seller
{
    public uint Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public Account Account { get; set; }
}