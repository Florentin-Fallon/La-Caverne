using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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

    public void RevokeTokens(LaCaverneDbContext db, bool save = true)
    {
        UserToken[] tokens = db.Tokens.Include(t => t.Account)
            .Where(token => token.Account.Id == Id).ToArray();
        if (tokens.Length > 0) db.Tokens.RemoveRange(tokens);

        if (save) db.SaveChanges();
    }

    public string CreateToken(LaCaverneDbContext db)
    {
        RevokeTokens(db, false);
        
        IConfigurationRoot cfg = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        
        byte[] key = Encoding.UTF8.GetBytes(cfg["Jwt:Key"]);
        SigningCredentials creds = new SigningCredentials(
            new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
        Guid jti = Guid.NewGuid();

        Claim[] claims =
        [
            new(JwtRegisteredClaimNames.Sub, Email),
            new(JwtRegisteredClaimNames.Jti, jti.ToString("N")),
            new(ClaimTypes.NameIdentifier, Id.ToString()),
            new(ClaimTypes.Role, "Customer")
        ];

        JwtSecurityToken token = new JwtSecurityToken(
            issuer: cfg["Jwt:Issuer"],
            audience: cfg["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds);

        string tokenString = new JwtSecurityTokenHandler().WriteToken(token);

        db.Tokens.Add(new UserToken() { Account = this, Token = jti.ToString("N") });
        db.SaveChanges();

        return tokenString;
    }
}