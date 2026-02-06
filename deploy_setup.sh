#!/bin/bash

# Pixel Game Deployment Setup Script

echo "🚀 開始設定 GitHub 自動部署..."

# 1. 檢查是否安裝 GitHub CLI
if ! command -v gh &> /dev/null; then
    echo "❌ 未檢測到 GitHub CLI (gh)。"
    echo "💡 為了達成「完全自動化」，請先安裝 GitHub CLI："
    echo "   Mac 使用者請執行: brew install gh"
    echo ""
    echo "安裝後，請執行 'gh auth login' 登入，然後再次執行此腳本。"
    echo ""
    echo "如果您不想安裝，請依照 README.md 的「手動」步驟操作。"
    exit 1
fi

# 2. 檢查 Git 狀態
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git..."
    git init
    git add .
    git commit -m "Initial commit"
fi

# 3. 登入檢查
echo "🔍 檢查 GitHub 登入狀態..."
if ! gh auth status &> /dev/null; then
    echo "⚠️ 您尚未登入 GitHub CLI。"
    echo "請依照指示登入："
    gh auth login
fi

# 4. 建立 Repository
echo "📦 正在 GitHub 上建立 Repository 'pixel-game'..."
# 嘗試建立，如果已存在則忽略錯誤
gh repo create pixel-game --public --source=. --remote=origin --push || echo "⚠️ Repository 可能已存在或建立失敗，嘗試繼續..."

# 5. 設定 Secrets
echo "🔑 設定 GitHub Actions Secrets..."
echo "請輸入您的 Google Apps Script 網頁應用程式網址 (Web App URL):"
read -r GAS_URL

if [ -z "$GAS_URL" ]; then
    echo "⚠️ 未輸入網址，跳過 Secret 設定。請稍後手動至 GitHub Settings 設定 'VITE_GOOGLE_APP_SCRIPT_URL'。"
else
    gh secret set VITE_GOOGLE_APP_SCRIPT_URL --body "$GAS_URL"
    echo "✅ Secret 設定完成！"
fi

# 6. 設定 Pages 來源 (需該 Repo 已有 gh-pages 分支或使用 Actions)
# 通常 Actions 會自動處理，但這裡我們確保推送到 main
echo "🚀 推送程式碼..."
git push -u origin main

echo ""
echo "🎉 設定完成！"
echo "請前往您的 Repository Settings > Pages，確認 Source 設定為 'GitHub Actions'。"
echo "您的網站稍後將會自動部署。"
