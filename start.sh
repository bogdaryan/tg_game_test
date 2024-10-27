#!/bin/bash

docker-compose up -d front

echo "ngrok http 8080"
read -p "Введите публичный URL, сгенерированный ngrok: " WEB_APP_URL

if [ -z "$WEB_APP_URL" ]; then
  echo "Ошибка: URL не был введён"
  exit 1
fi

echo "Получен публичный URL: $WEB_APP_URL"

if grep -q "^WEB_APP_URL=" ./bot/.env; then
  sed -i "s|^WEB_APP_URL=.*|WEB_APP_URL=$WEB_APP_URL|" ./bot/.env
else
  echo "WEB_APP_URL=$WEB_APP_URL" >> ./bot/.env
fi

docker-compose up -d
