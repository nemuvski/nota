# Web App: Nota 📝

👷🚧 ただいま工事中です。更新されていきます。

## 🧳 実行する前に

Firebaseで以下の準備をする。
1. プロジェクトの作成
2. Authenticationにて、EmailとPasswordでの認証を許可
3. Firestoreのセットアップ(データ作成等は不要)

```bash
cp .env.example .env.local

# Firebaseプロジェクトと連携するための情報等を記入
vi .env.local

# パッケージのインストール
yarn install

# Firebase CLI（firebase-tools）を事前に導入すること
firebase init
```

## 🧪 テスト

Firestoreのセキュリティルールのテストを実行する。

### 前準備

```bash
# Firestoreエミュレーターを導入
firebase setup:emulators:firestore
```
