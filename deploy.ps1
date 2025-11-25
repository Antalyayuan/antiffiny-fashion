# ===============================================
# 🚀 Smart Git Deploy Script for Tiffany Project
# Author: Davethan Tech
# ===============================================

param (
    [string]$Message = "update"
)

Write-Host "===============================" -ForegroundColor Cyan
Write-Host "🚀 Auto-deploy to GitHub started..." -ForegroundColor Green
Write-Host "===============================" -ForegroundColor Cyan

# 1️⃣ 检查是否在 Git 仓库中
if (-not (Test-Path ".git")) {
    Write-Host "❌ 当前目录不是 Git 仓库，请先执行 git init" -ForegroundColor Red
    exit 1
}

# 2️⃣ 检查是否有变更（新增的逻辑!!!）
$changes = git status --porcelain
if (-not $changes) {
    Write-Host "🟦 没有检测到代码更改，无需推送。" -ForegroundColor Yellow
    Write-Host "✨ 部署脚本结束。" -ForegroundColor Green
    exit 0
}

# 3️⃣ 确保在 main 分支
$currentBranch = git rev-parse --abbrev-ref HEAD
if ($currentBranch -ne "main") {
    Write-Host "⚙️ 当前分支是 $currentBranch，切换到 main..." -ForegroundColor Yellow
    git checkout main
}

# 4️⃣ 自动添加和提交
git add .
git commit -m "$Message"

# 5️⃣ 检查远程仓库
$remoteUrl = git remote get-url origin 2>$null
if (-not $remoteUrl) {
    Write-Host "⚙️ 未设置远程仓库，正在添加..." -ForegroundColor Yellow
    git remote add origin "https://github.com/davethantech/tiffany-fashion.git"
}

# 6️⃣ 从远程同步
Write-Host "🔄 正在同步远程仓库 (git pull --rebase)..." -ForegroundColor Cyan
git pull origin main --rebase

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ 检测到冲突，请手动解决后执行以下命令：" -ForegroundColor Red
    Write-Host "   git add . && git rebase --continue" -ForegroundColor Yellow
    exit 1
}

# 7️⃣ 推送代码
Write-Host "🚀 正在推送到远程仓库..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 推送成功！代码已同步到 GitHub。" -ForegroundColor Green
    
    # 自动打开 GitHub 仓库页面
    $repoUrl = "https://github.com/davethantech/tiffany-fashion"
    Write-Host "🌐 正在打开 GitHub 仓库页面..." -ForegroundColor Cyan
    Start-Process $repoUrl
} else {
    Write-Host "❌ 推送失败，请检查网络或远程仓库配置。" -ForegroundColor Red
}

Write-Host "===============================" -ForegroundColor Cyan
Write-Host "✨ 完成！" -ForegroundColor Green
Write-Host "===============================" -ForegroundColor Cyan
