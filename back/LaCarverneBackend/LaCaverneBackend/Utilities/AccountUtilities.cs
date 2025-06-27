namespace LaCaverneBackend.Utilities;

public static class AccountUtilities
{
    public static bool ValidatePassword(string password)
    {
        if (password.Length < 8) return false;
        if (!password.Any(char.IsLetter)) return false;
        if (password.Count(char.IsDigit) < 2) return false;

        return true;
    }
}