using LaCaverneBackend.Database.Models;

namespace LaCaverneBackend.Dto;

public class SellerInfosAccountDto(Account dbAccount, bool isSeller) : AccountDto(dbAccount, true)
{
    public bool IsSeller { get; set; } = isSeller;
}