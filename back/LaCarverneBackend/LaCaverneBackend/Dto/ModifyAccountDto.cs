namespace LaCaverneBackend.Dto;

public class ModifyAccountDto
{
    public string? Username { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Address { get; set; }
    public int? PostalCode { get; set; }
    public string? CityName { get; set; }
}