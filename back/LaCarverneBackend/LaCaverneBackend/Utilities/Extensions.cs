using System.Security.Claims;
using LaCaverneBackend.Database;
using LaCaverneBackend.Database.Models;
using Microsoft.EntityFrameworkCore;

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

    public static Seller? GetSellerProfile(this Account account, LaCaverneDbContext db)
        => db.Sellers.Include(seller => seller.Account).FirstOrDefault(seller => seller.Account.Id == account.Id);
}