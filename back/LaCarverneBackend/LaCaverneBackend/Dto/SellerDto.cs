using LaCaverneBackend.Database.Models;

namespace LaCaverneBackend.Dto;

public class SellerDto(Seller seller)
{
    public uint Id { get; set; } = seller.Id;
    public string Name { get; set; } = seller.Name;
    public string Description { get; set; } = seller.Description;
}