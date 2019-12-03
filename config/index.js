module.exports = {
  botToken: process.env.BOT_TOKEN,
  adminChatId: process.env.ADMIN_CHAT_ID,
  errorReportChatId: process.env.ERROR_CHAT_ID,
  webhook: process.env.BOT_DOMAIN ? {
    domain: process.env.BOT_DOMAIN,
    port: process.env.BOT_PORT || 4000,
  } : undefined,
};
