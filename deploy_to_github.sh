#!/bin/bash
# ==============================================================
# One-Click Deploy Toddler Safari to GitHub & GitHub Pages
# ==============================================================

set -e

echo "=========================================================="
echo "🚀 Toddler Safari - 一键部署到 GitHub"
echo "=========================================================="

# Check if git is available
if ! command -v git &> /dev/null; then
    echo "❌ 错误: 未检测到 git，请先安装 git。"
    exit 1
fi

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init -b main
else
    # Ensure branch is main
    git branch -M main 2>/dev/null || true
fi

# Check git user configuration
GIT_USER=$(git config user.name || echo "")
GIT_EMAIL=$(git config user.email || echo "")

if [ -z "$GIT_USER" ]; then
    read -p "👤 请输入您的 Git 用户名 (例如 Colin): " INPUT_USER
    if [ -n "$INPUT_USER" ]; then
        git config user.name "$INPUT_USER"
    else
        git config user.name "ToddlerSafariUser"
    fi
fi

if [ -z "$GIT_EMAIL" ]; then
    read -p "📧 请输入您的 Git 邮箱 (例如 user@example.com): " INPUT_EMAIL
    if [ -n "$INPUT_EMAIL" ]; then
        git config user.email "$INPUT_EMAIL"
    else
        git config user.email "user@example.com"
    fi
fi

# Check remote origin
REMOTE_URL=$(git remote get-url origin 2>/dev/null || echo "")

if [ -z "$REMOTE_URL" ]; then
    echo ""
    echo "📌 请输入您的 GitHub 仓库地址 (如 https://github.com/您的用户名/toddler-safari.git)"
    echo "   或者直接输入: 您的GitHub用户名/仓库名 (例如: colin/toddler-safari)"
    read -p "👉 仓库地址: " REPO_INPUT

    if [ -z "$REPO_INPUT" ]; then
        echo "❌ 仓库地址不能为空！请先在 github.com/new 创建一个新仓库，再运行此脚本。"
        exit 1
    fi

    # Handle shorthand format "username/repo"
    if [[ "$REPO_INPUT" =~ ^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$ ]]; then
        REMOTE_URL="https://github.com/$REPO_INPUT.git"
    else
        REMOTE_URL="$REPO_INPUT"
    fi

    git remote add origin "$REMOTE_URL"
    echo "✅ 成功绑定远程仓库: $REMOTE_URL"
else
    echo "🔗 已绑定远程仓库: $REMOTE_URL"
fi

# Stage all files
echo "📦 正在添加并提交所有网页与音频文件..."
git add .
git commit -m "Deploy Toddler Safari Enlightenment App" || echo "没有需要提交的新改动。"

# Push to GitHub
echo "🚀 正在推送到 GitHub (main 分支)..."
git push -u origin main

echo ""
echo "=========================================================="
echo "🎉 恭喜！代码已成功推送到 GitHub！"
echo "=========================================================="
echo ""
echo "📱 开启免费 iPad 在线访问（GitHub Pages 仅需 10 秒）："
echo "1. 打开您的 GitHub 仓库页面。"
echo "2. 点击顶部导航栏的「Settings（设置）」-> 左侧点击「Pages」。"
echo "3. 在「Branch」下拉菜单中选择「main」，点击「Save（保存）」。"
echo "4. 稍等 1-2 分钟，GitHub 会生成访问网址："
echo "   👉 https://<你的用户名>.github.io/<仓库名>/"
echo ""
echo "在老款 iPad Safari 打开该网址，添加到主屏幕即可随时随地畅玩！"
echo "=========================================================="
