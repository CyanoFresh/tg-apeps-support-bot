const config = require('../config');


const start = async ctx =>
  ctx.reply('Привет.\nНапиши свой вопрос или предложение и мы ответим тебе в ближайшее время!');

start.register = bot => {
  bot.start(start);

  bot.on('text', (ctx) => {
    ctx.forwardMessage(config.adminChatId, ctx.update.message.from.id);
  });

  bot.on('message', (ctx) => {
    ctx;
  });

  bot.mention('message', (ctx) => {
    ctx;
  });
};

module.exports = start;
