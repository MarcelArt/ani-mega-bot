const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;

let bot;

const initTelegramBot = () => {
  bot = new TelegramBot(token, { polling: true });

  bot.on('message', msg => {
    const chatId = msg.chat.id;
    console.log('chatId', chatId);
  });

  console.log('Telegram bot server started');
}

const sendMessageWithImage = async (chatId, imageUrl, message) => {
  bot.sendPhoto(chatId, imageUrl, { caption: message });
}

module.exports = {
  initTelegramBot,
  sendMessageWithImage,
};