#!/bin/bash
# Запуск бота курса в канал
cd "$(dirname "$0")"

if [ ! -f .env ]; then
  echo "Создайте файл .env с переменными BOT_TOKEN и CHANNEL."
  echo "Скопируйте: cp .env.example .env"
  echo "Откройте .env и вставьте токен бота и @username канала."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Устанавливаю зависимости..."
  npm install
fi

echo "Запускаю бота..."
node index.js
