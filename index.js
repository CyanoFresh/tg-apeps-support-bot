if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const Telegraf = require('telegraf');
const config = require('./config');
const errorHandler = require('./middlewares/errorHandler');
const { start } = require('./commands');

const bot = new Telegraf(config.botToken);

bot.catch(console.error);

bot.use(errorHandler);

// Register commands
start.register(bot);

bot
  .launch({
    webhook: config.webhook,
  })
  .then(() => console.log('Bot started'))
  .catch(err => {
    console.error('Bot launch error:', err);
    process.exit(5);
  });
