namespace LaCaverneBackend.Dto;

public record ChangePasswordDto(string CurrentPassword, string NewPassword, string ConfirmNewPassword);