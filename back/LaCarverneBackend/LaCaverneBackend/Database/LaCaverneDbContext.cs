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
    public DbSet<Like> Likes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        
        IConfigurationRoot cfg = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        
        optionsBuilder.UseMySQL(cfg["Db:ConnectionString"]);
    }
}