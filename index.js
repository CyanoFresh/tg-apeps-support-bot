if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const Telegraf = require('telegraf');
const config = require('./config');
const errorHandler = require('./middlewares/errorHandler');

const bot = new Telegraf(config.botToken);

bot.catch(console.error);

bot.use(errorHandler);

bot.start(ctx =>
  ctx.reply('Привет.\nНапиши свой вопрос или предложение и мы ответим тебе в ближайшее время!'));

bot.on('text', (ctx) => {
  const isFromAdminChat = ctx.update.message.chat.id.toString() === config.adminChatId;

  if (isFromAdminChat && ctx.update.message.reply_to_message) {
    const originalMsg = ctx.update.message.reply_to_message;
    return ctx.tg.sendCopy(originalMsg.forward_from.id, ctx.message);
  }

  return ctx.forwardMessage(config.adminChatId);
});

bot
  .launch({
    webhook: config.webhook,
  })
  .then(() => console.log('Bot started'))
  .catch(err => {
    console.error('Bot launch error:', err);
    process.exit(5);
  });
