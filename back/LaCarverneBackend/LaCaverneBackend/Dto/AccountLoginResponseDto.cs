using LaCaverneBackend.Database.Models;

namespace LaCaverneBackend.Dto;

public class AccountLoginResponseDto
{
    public string Token { get; set; }
    public AccountDto Account { get; set; }

    public AccountLoginResponseDto()
    {
        
    }

    public AccountLoginResponseDto(Account account, string token)
    {
        Account = new AccountDto(account, false);
        Token = token;
    }
}