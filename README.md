# Web App: Nota 📝

## 🧳 実行する前に

Firebaseで以下の準備をする。
1. プロジェクトの作成
2. Authenticationにて、EmailとPasswordでの認証を許可
3. Firestoreのセットアップ(データ作成等は不要)
4. Cloud Storageのセットアップ
5. 以下のコマンドを実行

```bash
cp .env.example .env.local

# Firebaseプロジェクトと連携するための情報等を記入
vi .env.local

# パッケージのインストール
yarn install

# Firebase CLI（firebase-tools）を事前に導入すること
firebase init

# Firestore, Cloud Storageの設定等をデプロイ
yarn deploy:firestore:rules
yarn deploy:firestore:indexes
yarn deploy:storage:rules
```

## 🚗💨 ローカル環境での実行

```bash
yarn dev
```

## 🧪 テスト

Firestoreのセキュリティルールのテストを実行する。

### 前準備

```bash
# Firestoreエミュレーターを導入
firebase setup:emulators:firestore
```

### テストコマンド

```bash
yarn test:firestore:account
yarn test:firestore:article
```
