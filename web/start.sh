#!/bin/bash

# エラーが発生した場合はスクリプトを停止
set -e

echo "Nostter アプリケーションを起動しています..."

# Docker Composeでアプリケーションをビルドして起動
docker compose up --build -d

echo "アプリケーションが起動しました。"
echo "ブラウザで http://localhost:3000 にアクセスしてください。"
echo ""
echo "ログを確認するには: docker-compose logs -f"
echo "アプリケーションを停止するには: docker-compose down"
