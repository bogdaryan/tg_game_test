# Telegram Mini App

## Stack:

#### React, TS, NodeJS, Phaser

client

`yarn install`\
`yarn dev`

---

server

`yarn install`\
`yarn dev`

\
Нужно указать 2 .env переменнные \
`BOT_TOKEN` \
`WEB_APP_URL` - можно использовать `ngrok http  5173` чтобы получить публичную ссылку

Управлять можно стрелочками с клавиатуры или с помощью графического интерфейса.

Сохранение реализовано с помощью `localStorage`
На событие `beforeunload`сохраняется всё что нужно сохранить со сцены.
И при запуске игры достаю данные из  `localStorage` и отображаю элементы на сцене 

но есть проблема, в ПК версии почему-то нет `localStorage` - поэтому на ПК сохранение результата не работает.

Чтобы исправить это, можно было бы всё на backend сохранять или в какой-то DB.

Вот бот и его токен
@game_gg_777_bot
BOT_TOKEN=7658667721:AAGSKvVre3t4LL2XFX-xCpVfdX6KKpTVBW8
