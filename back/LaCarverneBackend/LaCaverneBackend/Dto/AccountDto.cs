using LaCaverneBackend.Database.Models;

namespace LaCaverneBackend.Dto;

public class AccountDto(Account dbAccount)
{
    public uint Id => dbAccount.Id;
    public string Email => dbAccount.Email;
    public string Username => dbAccount.Username;
    public bool Admin => dbAccount.IsAdmin;
}