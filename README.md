# 🤖 Slack Reaction Bot

Slackに投稿されたSlackのシステムメッセージを除く、Threadの親メッセージのみに対して、リアクション（絵文字）を自動で付けるBotです。

---

## 📦 使用技術

- [Slack Bolt (Node.js)](https://slack.dev/bolt-js/)
- [Render](https://render.com)（無料ホスティング）

---

## 🚀 機能概要

- 任意のSlackチャンネルに投稿されたSlackのシステムメッセージを除く、Threadの親メッセージのみに自動でリアクションを付けます。
- メッセージ内容に関係なく、指定された絵文字（デフォルトは 👍）で反応します。

---

## ⚙️ Slackアプリの作成と設定

### 1. Slackアプリを作成

- [Slack API](https://api.slack.com/apps) からアプリを作成

### 2. Event Subscriptions

- ONにして、以下を設定：

```
https://your-app-name.onrender.com/slack/events
```

- Botイベントに `message.channels` を追加

### 3. OAuth & Permissions

スコープに以下を追加：

- `reactions:write`
- `channels:read`
- `channels:history`

### 4. ワークスペースにインストール & Botをチャンネルに招待

```
/invite @YourBotName
```

---

## 🌐 Renderへのデプロイ手順

### 1. Web Serviceを新規作成

- GitHubリポジトリを連携して選択
- Build Command: `npm install`
- Start Command: `node index.js`
- Environment Type: `Node`

### 2. 環境変数を追加

| Key                   | Value                              |
|-----------------------|------------------------------------|
| `SLACK_BOT_TOKEN`     | xoxb-xxxxxxxxxxxxxxxxxxxxxxxx      |
| `SLACK_SIGNING_SECRET`| xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx     |

---

## 🧠 カスタマイズ方法

リアクション絵文字は `index.js` 内の以下の箇所を変更：

```js
await client.reactions.add({
  name: "thumbsup", // 👈 例: eyes, tada, heart などに変更可能
  channel: event.channel,
  timestamp: event.ts,
});
```

---

## 📄 ライセンス

MIT License
