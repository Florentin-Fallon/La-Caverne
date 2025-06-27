using System.Security.Claims;
using LaCaverneBackend.Database;
using LaCaverneBackend.Database.Models;

namespace LaCaverneBackend.Utilities;

public static class Extensions
{
    public static Account? Account(this ClaimsPrincipal user, LaCaverneDbContext db)
    {
        string? email = user.FindFirstValue(ClaimTypes.NameIdentifier);
        if (email == null) return null;

        Account? account = db.Accounts.FirstOrDefault(account => account.Email == email);
        return account;
    }
}