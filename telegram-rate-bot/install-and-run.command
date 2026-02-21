#!/bin/bash
# Двойной клик по этому файлу в Finder — установка и запуск бота (Mac)
cd "$(dirname "$0")"

# Ищем node и npm (часто они есть, но не в PATH)
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
if command -v node >/dev/null 2>&1; then
  NODE_CMD="node"
  NPM_CMD="npm"
else
  # Пробуем типичные пути на Mac
  for p in /usr/local/bin/node /opt/homebrew/bin/node; do
    if [ -x "$p" ]; then
      NODE_CMD="$p"
      NPM_CMD="$(dirname "$p")/npm"
      export PATH="$(dirname "$p"):$PATH"
      break
    fi
  done
fi

if [ -z "$NODE_CMD" ] || ! [ -x "$(command -v node 2>/dev/null)" ] && ! [ -x "$NODE_CMD" ]; then
  echo "Node.js не найден."
  echo "1. Установите с https://nodejs.org (LTS)"
  echo "2. Полностью закройте этот окно, Cursor и Терминал."
  echo "3. Откройте Cursor снова и запустите этот файл ещё раз."
  echo ""
  read -p "Нажмите Enter для выхода..."
  exit 1
fi

echo "Node: $(node -v 2>/dev/null || $NODE_CMD -v)"
echo ""

if [ ! -f .env ]; then
  echo "Файл .env не найден."
  echo "Скопируйте .env.example в .env и впишите BOT_TOKEN и CHANNEL."
  if [ -f .env.example ]; then
    cp .env.example .env
    echo "Создан .env из .env.example — откройте .env и впишите токен и канал."
  fi
  open -e .env 2>/dev/null || open .env 2>/dev/null || echo "Откройте файл .env в редакторе."
  echo ""
  read -p "После сохранения .env нажмите Enter..."
fi

if [ ! -d node_modules ]; then
  echo "Устанавливаю зависимости..."
  npm install
fi

echo "Запускаю бота (остановка: Ctrl+C или закройте окно)..."
echo ""
node index.js

read -p "Нажмите Enter для выхода..."
