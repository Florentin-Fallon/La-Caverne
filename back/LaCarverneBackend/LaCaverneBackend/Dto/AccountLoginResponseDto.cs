using LaCaverneBackend.Database.Models;

namespace LaCaverneBackend.Dto;

public class AccountLoginResponseDto
{
    public string Token { get; set; }
    public SellerInfosAccountDto Account { get; set; }

    public AccountLoginResponseDto()
    {
        
    }

    public AccountLoginResponseDto(Account account, bool isSeller, string token)
    {
        Account = new SellerInfosAccountDto(account, isSeller);
        Token = token;
    }
}