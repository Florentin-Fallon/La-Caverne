using System.Data.Common;
using LaCaverneBackend.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace LaCaverneBackend.Database;

public class LaCaverneDbContext : DbContext
{
    public DbSet<Account> Accounts { get; set; }
    public DbSet<Article> Articles { get; set; }
    public DbSet<Notation> Notations { get; set; }
    public DbSet<Seller> Sellers { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<TagAccount> TagAccounts { get; set; }
    public DbSet<TagArticle> TagArticles { get; set; }
    public DbSet<UserToken> Tokens { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        
        optionsBuilder.UseMySQL("server=localhost;port=3306;database=caverne;user=root;password=password;");
    }
}