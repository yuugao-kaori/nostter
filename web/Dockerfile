# Node.js 18のベースイメージを使用
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm ci

# ソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# ポート4173を公開（vite previewのデフォルトポート）
EXPOSE 4173

# 環境変数を設定
ENV NODE_ENV=production

# アプリケーションをpreviewモードで起動
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
