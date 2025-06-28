using LaCaverneBackend.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LaCaverneBackend.Controllers;

[ApiController]
[Route("sellers")]
public class SellersController : ControllerBase
{
    private LaCaverneDbContext _db;

    public SellersController(LaCaverneDbContext db)
    {
        _db = db;
    }
}