require("dotenv").config();
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.event("message", async ({ event, client }) => {
  const subtype = event.subtype;

  const systemSubtypes = new Set([
    "channel_join",
    "channel_leave",
    "channel_topic",
    "channel_purpose",
    "channel_name",
    "channel_archive",
    "channel_unarchive",
    "message_deleted",
    "pinned_item",
    "unpinned_item",
  ]);

  // 除外: Bot投稿、編集済み投稿、スレッド内返信、システムメッセージ
  if (
    subtype === "bot_message" ||
    subtype === "message_changed" ||
    systemSubtypes.has(subtype) ||
    event.thread_ts // スレッド内返信なら除外
  ) {
    return;
  }

  const hasText = typeof event.text === "string" && event.text.trim() !== "";
  const hasLink = hasText && event.text.includes("http");
  const hasFiles = Array.isArray(event.files) && event.files.length > 0;

  // 条件: 画像のみ、テキストのみ、リンクのみ、画像＋テキスト、画像＋リンク、リンク＋テキスト
  if (
    (hasFiles && !hasText) || // 画像のみ
    (hasText && !hasFiles) || // テキスト or リンクのみ
    (hasFiles && hasText) // 画像＋テキスト or 画像＋リンク
  ) {
    try {
      await client.reactions.add({
        name: "snake",
        channel: event.channel,
        timestamp: event.ts,
      });
    } catch (error) {
      console.error("リアクション失敗:", error?.data?.error || error);
    }
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bot is running");
})();
