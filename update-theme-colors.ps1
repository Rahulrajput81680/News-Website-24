# PowerShell script to update all color classes to Dark Mode Palette

$files = @(
    "components\Header.tsx",
    "components\Footer.tsx",
    "components\HeroSection.tsx",
    "components\LatestNews.tsx",
    "components\CategorySection.tsx",
    "components\TrendingNews.tsx",
    "components\PageLoader.tsx",
    "app\page.tsx",
    "app\category\[slug]\page.tsx",
    "app\article\[slug]\ArticleClient.tsx",
    "app\admin\page.tsx",
    "app\admin\create\page.tsx",
    "app\admin\edit\[id]\page.tsx",
    "app\about\page.tsx",
    "app\contact\page.tsx",
    "app\privacy\page.tsx",
    "app\terms\page.tsx",
    "app\search\page.tsx"
)

$replacements = @{
    # Background Colors
    'bg-white dark:bg-gray-900' = 'bg-background'
    'dark:bg-gray-900' = 'bg-background'
    'bg-gray-50 dark:bg-gray-800' = 'bg-background-elevated'
    'bg-gray-100 dark:bg-gray-800' = 'bg-background-elevated'
    'bg-gray-100 dark:bg-gray-700' = 'bg-background-elevated'
    'bg-gray-200 dark:bg-gray-800' = 'bg-background-elevated'
    'bg-gray-200 dark:bg-gray-700' = 'bg-background-elevated'
    'bg-gray-300 dark:bg-gray-700' = 'bg-background-elevated'
    'dark:bg-gray-800' = 'bg-background-secondary'
    'dark:bg-gray-700' = 'bg-background-elevated'
    'dark:bg-gray-600' = 'bg-background-elevated'
    'bg-gray-900' = 'bg-background'
    
    # Text Colors  
    'text-gray-900 dark:text-gray-100' = 'text-text-primary'
    'dark:text-gray-100' = 'text-text-primary'
    'text-gray-600 dark:text-gray-400' = 'text-text-secondary'
    'text-gray-600 dark:text-gray-300' = 'text-text-secondary'
    'text-gray-700 dark:text-gray-300' = 'text-text-secondary'
    'dark:text-gray-400' = 'text-text-secondary'
    'dark:text-gray-300' = 'text-text-secondary'
    'text-gray-500 dark:text-gray-400' = 'text-text-muted'
    'text-gray-500' = 'text-text-muted'
    'text-gray-600' = 'text-text-secondary'
    'text-gray-400' = 'text-text-muted'
    'text-gray-300' = 'text-text-secondary'
    'text-gray-200' = 'text-text-primary'
    
    # Border Colors
    'border-gray-200 dark:border-gray-800' = 'border-border'
    'border-gray-200 dark:border-gray-700' = 'border-border'
    'border-gray-300 dark:border-gray-700' = 'border-border'
    'dark:border-gray-800' = 'border-border'
    'dark:border-gray-700' = 'border-border'
    'dark:border-gray-600' = 'border-border-card'
    'border-gray-300' = 'border-border'
    'border-gray-200' = 'border-border'
    
    # Hover States
    'hover:bg-gray-100 dark:hover:bg-gray-800' = 'hover:bg-background-elevated'
    'hover:bg-gray-100 dark:hover:bg-gray-700' = 'hover:bg-background-elevated'
    'hover:bg-gray-200 dark:hover:bg-gray-700' = 'hover:bg-background-elevated'
    'hover:bg-gray-300 dark:hover:bg-gray-700' = 'hover:bg-background-elevated'
    'hover:bg-gray-300 dark:hover:bg-gray-600' = 'hover:bg-background-elevated'
    'dark:hover:bg-gray-800' = 'hover:bg-background-elevated'
    'dark:hover:bg-gray-700' = 'hover:bg-background-elevated'
    'dark:hover:bg-gray-600' = 'hover:bg-background-elevated'
    'hover:bg-gray-50 dark:hover:bg-gray-700/50' = 'hover:bg-background-elevated/50'
    
    # Special Colors
    'text-primary' = 'text-accent-blue'
    'hover:text-primary' = 'hover:text-accent-blue'
    'ring-primary' = 'ring-accent-blue'
    'focus:ring-primary' = 'focus:ring-accent-blue'
    'border-primary' = 'border-accent-blue'
    'bg-primary' = 'bg-accent-blue'
}

foreach ($file in $files) {
    $filePath = Join-Path $PSScriptRoot $file
    if (Test-Path $filePath) {
        Write-Host "Processing: $file" -ForegroundColor Cyan
        $content = Get-Content $filePath -Raw
        
        foreach ($old in $replacements.Keys) {
            $new = $replacements[$old]
            if ($content -match [regex]::Escape($old)) {
                $content = $content -replace [regex]::Escape($old), $new
                Write-Host "  Replaced: $old -> $new" -ForegroundColor Green
            }
        }
        
        Set-Content $filePath -Value $content -NoNewline
        Write-Host "  ✓ Updated $file" -ForegroundColor Green
    } else {
        Write-Host "  ✗ File not found: $file" -ForegroundColor Red
    }
}

Write-Host "`n✓ Theme color update complete!" -ForegroundColor Green
