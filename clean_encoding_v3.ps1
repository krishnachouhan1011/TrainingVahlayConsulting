$files = Get-ChildItem -Path "src" -Recurse -Include "*.jsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content

    # Use regex replace
    $content = $content -replace "â€¢", ""
    $content = $content -replace "â€™", "'"
    $content = $content -replace "â€œ", '"'
    $content = $content -replace "â€", '"'
    $content = $content -replace "â€“", " - "
    $content = $content -replace "â€”", "-"

    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline -Encoding UTF8
        Write-Host "Cleaned: $($file.Name)"
    }
}
Write-Host "Encoding cleanup completed."
