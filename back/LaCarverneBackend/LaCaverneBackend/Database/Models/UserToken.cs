namespace LaCaverneBackend.Database.Models;

public class UserToken
{
    public uint Id { get; set; }
    public Account Account { get; set; }
    public string Token { get; set; }
}