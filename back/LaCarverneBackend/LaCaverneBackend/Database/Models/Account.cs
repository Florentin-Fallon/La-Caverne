namespace LaCaverneBackend.Database.Models;

public class Account
{
    public uint Id { get; set; }
    public string Email { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public TagAccount[] PreferredTags { get; set; }
    
    public void SetPassword(string password)
    {
        Password = BCrypt.Net.BCrypt.HashPassword(password);
    }
    
    public bool CheckPassword(string password)
    {
        return BCrypt.Net.BCrypt.Verify(password, Password);
    }
}