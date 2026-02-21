#!/bin/bash
cd "$(dirname "$0")"
export PATH="/usr/local/bin:/opt/homebrew/bin:$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node 2>/dev/null | tail -1)/bin:$PATH"
echo "Запускаю сайт на http://localhost:3000"
echo "Открой в браузере: http://localhost:3000"
echo "Остановка: Ctrl+C или закрой это окно."
echo ""
npx --yes serve . -p 3000
