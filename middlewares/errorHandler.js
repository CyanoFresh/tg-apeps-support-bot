const config = require('../config');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    let msg;

    if (error.code === 403) {
      msg = 'Бот был заблокирован пользователем';
    } else {
      console.error('asyncMiddleware error:', ctx, error);

      await ctx.telegram.sendMessage(config.errorReportChatId, `Error from @${ctx.botInfo.username}:\n${error.stack}`);
      await ctx.telegram.sendMessage(config.errorReportChatId, JSON.stringify(error));

      msg = 'Произошла ошибка :/\nСкоро пофиксим';
    }

    if (ctx.updateType === 'callback_query') {
      await ctx.editMessageText(msg);
    } else {
      await ctx.reply(msg);
    }
  }
};
