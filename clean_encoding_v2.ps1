$files = Get-ChildItem -Path "src" -Recurse -Include "*.jsx"

foreach ($file in $files) {
    try {
        $content = Get-Content $file.FullName -Raw
        $originalContent = $content

        # Direct string replacements
        $content = $content.Replace('â€¢', '')
        $content = $content.Replace('â€™', "'")
        $content = $content.Replace('â€œ', '"')
        $content = $content.Replace('â€', '"')
        $content = $content.Replace('â€“', '-')
        $content = $content.Replace('â€”', '-')

        if ($content -ne $originalContent) {
            Set-Content -Path $file.FullName -Value $content -NoNewline -Encoding UTF8
            Write-Host "Cleaned: $($file.Name)"
        }
    }
    catch {
        Write-Host "Error processing $($file.Name): $_"
    }
}
Write-Host "Encoding cleanup completed."
