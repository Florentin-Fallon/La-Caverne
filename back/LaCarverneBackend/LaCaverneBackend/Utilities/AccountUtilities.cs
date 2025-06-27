namespace LaCaverneBackend.Utilities;

public static class AccountUtilities
{
    public static bool ValidatePassword(string password)
    {
        if (password.Length < 8) return false;
        if (!password.Any(char.IsLetter)) return false;
        if (!password.Any(char.IsDigit)) return false;

        return true;
    }
}