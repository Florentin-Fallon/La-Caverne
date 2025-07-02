using LaCaverneBackend.Database.Models;

namespace LaCaverneBackend.Dto;

public class AccountDto(Account dbAccount, bool detailed)
{
    public uint Id => dbAccount.Id;
    public string Email => dbAccount.Email;
    public string Username => dbAccount.Username;
    public bool Admin => dbAccount.IsAdmin;
    public string? FirstName => detailed ? dbAccount.FirstName : null;
    public string? LastName => detailed ? dbAccount.LastName : null;
    public string? PhoneNumber => detailed ? dbAccount.PhoneNumber : null;
    public string? Address => detailed ? dbAccount.Address : null;
    public int? PostalCode => detailed ? dbAccount.PostalCode : null;
    public string? CityName => detailed ? dbAccount.CityName : null;
}