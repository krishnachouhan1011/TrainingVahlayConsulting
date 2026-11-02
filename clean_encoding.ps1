$files = Get-ChildItem -Path "src" -Recurse -Include "*.jsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Replacements
    # â€¢ (Bullet) -> Remove
    # â€™ (Right single quote) -> '
    # â€œ (Left double quote) -> "
    # â€ (Right double quote/generic garbage suffix) -> "
    # â€“ (En dash) -> -
    # â€” (Em dash) -> -
    
    $newContent = $content -replace 'â€¢', '' `
        -replace 'â€™', "'" `
        -replace 'â€œ', '"' `
        -replace 'â€', '"' `
        -replace 'â€“', '-' `
        -replace 'â€”', '-'

    if ($content -ne $newContent) {
        Set-Content $file.FullName $newContent -NoNewline -Encoding UTF8
        Write-Host "Cleaned: $($file.Name)"
    }
}
Write-Host "Encoding cleanup completed."
