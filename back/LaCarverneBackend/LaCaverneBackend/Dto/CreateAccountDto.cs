﻿namespace LaCaverneBackend.Dto;

public class CreateAccountDto
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string ConfirmPassword { get; set; }
}