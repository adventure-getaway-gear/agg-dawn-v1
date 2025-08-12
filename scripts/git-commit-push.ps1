Param(
  [Parameter(Mandatory=$false)][string]$Message,
  [switch]$NoVerify,
  [switch]$NoCommit,
  [switch]$NoPrompt
)

function Invoke-Git {
  param([string]$Cmd)
  # Use cmd parsing to honor quotes inside the argument string (e.g., commit messages)
  & cmd /c "git $Cmd"
  if ($LASTEXITCODE -ne 0) {
    Write-Error "Git command failed: git $Cmd"; exit $LASTEXITCODE
  }
}

try {
  # Ensure we run from repo root
  $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
  $repoRoot = Resolve-Path (Join-Path $scriptDir '..')
  Set-Location $repoRoot

  if (-not $NoPrompt -and -not $NoCommit -and [string]::IsNullOrWhiteSpace($Message)) {
    $Message = Read-Host -Prompt "Enter commit message (or leave empty to skip commit)"
  }

  $status = git status --porcelain
  $hasChanges = -not [string]::IsNullOrWhiteSpace($status)

  if ($hasChanges -and -not $NoCommit -and -not [string]::IsNullOrWhiteSpace($Message)) {
    Write-Host "Staging all changes..." -ForegroundColor Cyan
  Invoke-Git "add -A"

    Write-Host "Committing..." -ForegroundColor Cyan
    if ($NoVerify) {
  Invoke-Git "commit -m `"$Message`" --no-verify"
    } else {
  Invoke-Git "commit -m `"$Message`""
    }
  } elseif ($hasChanges -and -not $NoCommit) {
    Write-Host "Changes detected but no commit message provided. Skipping commit." -ForegroundColor Yellow
  } elseif ($hasChanges -and $NoCommit) {
    Write-Host "Changes detected but commit step skipped by -NoCommit." -ForegroundColor Yellow
  } else {
    Write-Host "No changes to commit." -ForegroundColor Yellow
  }

  $branch = (git rev-parse --abbrev-ref HEAD).Trim()
  if ([string]::IsNullOrWhiteSpace($branch) -or $branch -eq 'HEAD') {
    Write-Error "Unable to determine current branch."; exit 1
  }

  Write-Host "Fetching from origin..." -ForegroundColor Cyan
  Invoke-Git "fetch origin"

  Write-Host "Rebasing onto origin/$branch..." -ForegroundColor Cyan
  git pull --rebase origin $branch
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Rebase encountered conflicts. Resolve them, then run:`n  git rebase --continue`nWhen done, re-run this script to push." -ForegroundColor Yellow
    exit $LASTEXITCODE
  }

  # Determine if upstream is set
  $upstream = git rev-parse --abbrev-ref --symbolic-full-name "@{u}" 2>$null
  $hasUpstream = $LASTEXITCODE -eq 0 -and -not [string]::IsNullOrWhiteSpace($upstream)

  Write-Host "Pushing to origin/$branch..." -ForegroundColor Cyan
  if ($hasUpstream) {
  Invoke-Git "push"
  } else {
  Invoke-Git "push --set-upstream origin $branch"
  }

  Write-Host "Done." -ForegroundColor Green
} catch {
  Write-Error $_.Exception.Message
  exit 1
}
