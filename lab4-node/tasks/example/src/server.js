import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'

const runServer = () => {
  dotenv.config(); 
  const token = process.env.TELEGRAM_BOT_TOKEN;

  // Создаем экземпляр бота
  const bot = new TelegramBot(token, { polling: true });

  // Обрабатываем команду /start
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет! Я твой первый бот!');
  });

  // Обрабатываем текстовые сообщения
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;    
    if (text !== '/start') {
      bot.sendMessage(chatId, `Вы сказали: "${text}"`);
    }
  });

  console.log('Бот запущен...');
}

export default runServer;