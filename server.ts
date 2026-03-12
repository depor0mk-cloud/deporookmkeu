import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Telegraf } from 'telegraf';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Telegram Bot
const bot = new Telegraf(process.env.BOT_TOKEN || '');

bot.start((ctx) => ctx.reply('Привет! Я бот для управления кланом.'));
bot.on('text', (ctx) => ctx.reply(`Вы написали: ${ctx.message.text}`));

bot.launch().then(() => {
  console.log('Telegram bot started');
});

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all other routes by serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
