param(
  [Parameter(Mandatory = $true)]
  [string]$Bucket,

  [string]$DistDir = "docs/.vitepress/dist"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $DistDir)) {
  throw "Build output not found: $DistDir"
}

$cacheLong = "public,max-age=2592000,immutable"
$cacheShort = "public,max-age=0,must-revalidate"

# Static assets: long cache
aws s3 sync $DistDir "s3://$Bucket" `
  --delete `
  --exclude "*.html" `
  --cache-control $cacheLong

# HTML: short cache
aws s3 sync $DistDir "s3://$Bucket" `
  --delete `
  --exclude "*" `
  --include "*.html" `
  --cache-control $cacheShort
