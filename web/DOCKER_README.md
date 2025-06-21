# Nostter Docker セットアップ

このディレクトリには、NostterアプリケーションをDockerで実行するためのファイルが含まれています。

## ファイル構成

- `Dockerfile`: プロダクション用のDockerfile
- `Dockerfile.dev`: 開発環境用のDockerfile
- `docker-compose.yml`: プロダクション用のDocker Compose設定
- `docker-compose.dev.yml`: 開発環境用のDocker Compose設定
- `start.sh`: アプリケーション起動スクリプト
- `.dockerignore`: Dockerビルド時に除外するファイル設定

## クイックスタート

### プロダクション環境での実行

```bash
# 起動スクリプトを使用（推奨）
./start.sh

# または直接docker-composeを使用
docker-compose up --build -d
```

### 開発環境での実行

```bash
docker-compose -f docker-compose.dev.yml up --build
```

## アクセス

- **プロダクション**: http://localhost:3000
- **開発環境**: http://localhost:5173

## 管理コマンド

```bash
# ログを確認
docker-compose logs -f

# アプリケーションを停止
docker-compose down

# コンテナとイメージを削除
docker-compose down --volumes --rmi all

# 開発環境を停止
docker-compose -f docker-compose.dev.yml down
```

## トラブルシューティング

### ポートが既に使用されている場合

docker-compose.ymlファイルのportsセクションを編集してください：

```yaml
ports:
  - "8080:3000"  # 8080など別のポートに変更
```

### ビルドエラーが発生する場合

```bash
# キャッシュを無視してリビルド
docker-compose build --no-cache

# 全てのDockerリソースをクリーンアップ
docker system prune -af
```
