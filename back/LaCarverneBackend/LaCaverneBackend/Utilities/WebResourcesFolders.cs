namespace LaCaverneBackend.Utilities;

public static class WebResourcesFolders
{
    public static string FolderPath { get; private set; }
    
    public static void Init()
    {
        FolderPath = "webres/";
        Directory.CreateDirectory(FolderPath);
    }

    public static string GetFolder(string name)
    {
        Directory.CreateDirectory($"webres/{name}");
        
        return $"webres/{name}";
    }
}