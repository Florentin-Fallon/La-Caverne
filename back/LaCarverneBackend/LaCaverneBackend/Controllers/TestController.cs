using Microsoft.AspNetCore.Mvc;

namespace LaCaverneBackend.Controllers;

[Route("test")]
public class TestController : ControllerBase
{
    [HttpGet]
    public object Get()
    {
        return "bloc";
    }
}