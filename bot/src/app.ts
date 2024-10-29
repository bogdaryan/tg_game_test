import 'dotenv/config';
import { Context, Telegraf } from 'telegraf';
const { BOT_TOKEN, WEB_APP_URL } = process.env;

const bot: Telegraf<Context> = new Telegraf(BOT_TOKEN!);

bot.on('message', async (ctx) => {
  const text = ctx.text;

  if (text === '/start') {
    await ctx.reply('Кнопка для старта игры', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Play',
              web_app: { url: WEB_APP_URL! },
            },
          ],
        ],
      },
    });
  }
});

bot.launch();
