require('dotenv').config();
const AdCreatorBot = require('./bot');

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('❌ Ошибка: BOT_TOKEN не установлен в переменных окружения');
  process.exit(1);
}

const bot = new AdCreatorBot(BOT_TOKEN);
bot.launch();

// Включить graceful stop
process.once('SIGINT', () => bot.bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.bot.stop('SIGTERM'));