# Telegram-бот курса RUB/USDT

Публикует сообщение с курсом в Telegram-канал и раз в 60 секунд обновляет его (редактирует последнее сообщение). Источник курса — тот же, что на сайте (CoinGecko + спред).

---

## Быстрый старт

### Способ 1: без терминала (Mac)

1. В **Finder** открой папку **telegram-rate-bot** (внутри твоего проекта).
2. **Правый клик** по файлу **`install-and-run.command`** → **Открыть** (или двойной клик). При первом запуске Mac может спросить разрешение — нажми «Открыть».
3. Если появится «Файл .env не найден» — откроется или будет создан файл `.env`. Впиши в него `BOT_TOKEN` и `CHANNEL`, сохрани и снова запусти `install-and-run.command`.
4. Бот установит зависимости и запустится. В канале появится сообщение с курсом. Остановка: закрой окно терминала или **Ctrl+C**.

### Способ 2: через терминал

Если после установки Node.js команда `npm` не находится:

- **Полностью закрой** все окна Терминала и Cursor, затем снова открой Cursor и открой новый терминал (Terminal → New Terminal).
- В новом терминале выполни:
  ```bash
  cd lux-minimal-newline/telegram-rate-bot
  npm install
  ```
  Если снова «command not found» — введи:
  ```bash
  export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
  npm install
  ```

Дальше создай `.env` (скопируй из `.env.example`, впиши токен и канал) и запусти: `npm start`.

---

## Формат сообщения

```
💱 Курс RUB/USDT
💲 Цена: 91.53
💵 Мин. сумма сделки: 20 000
📲 Связь: @Fl0wExchange
Обновлено: 14:32:00 (UTC+3)
```

## Требования

- Node.js 18+
- Бот создан в [@BotFather](https://t.me/BotFather), токен получен
- Бот добавлен в канал как **администратор** с правом **публикации сообщений**

---

## Запуск локально

### 1. Установка

```bash
cd telegram-rate-bot
npm install
```

### 2. Настройка переменных окружения

**Вариант А — файл `.env` (удобно для локального запуска):**

```bash
cp .env.example .env
```

Откройте `.env` и заполните:

```
BOT_TOKEN=123456789:ABCdefGHI...
CHANNEL=@Fl0wExchange
```

- `BOT_TOKEN` — токен от @BotFather.
- `CHANNEL` — @username канала (например `@Fl0wExchange`) или ID канала (например `-1001234567890`). Бот должен быть админом канала с правом публикации.

**Вариант Б — переменные в терминале (без .env):**

```bash
export BOT_TOKEN="123456789:ABCdef..."
export CHANNEL="@Fl0wExchange"
```

### 3. Запуск

```bash
npm start
```

или

```bash
node index.js
```

В консоли появятся строки вида: `Старт бота...`, `Курс обновлён: 91.53`. В канале — одно сообщение, которое будет обновляться раз в минуту.

### 4. Остановка

В терминале: `Ctrl+C`.

---

## Запуск на сервере

### 1. Установка на сервере (Linux)

```bash
cd /path/to/telegram-rate-bot
npm install
```

Убедитесь, что установлен Node.js 18+:

```bash
node -v
```

### 2. Переменные окружения на сервере

Создайте `.env` в папке бота (как в «Запуск локально») или задайте переменные в systemd/сервисе (см. ниже).

### 3. Запуск через systemd (рекомендуется)

Создайте файл сервиса (например `/etc/systemd/system/flowexchange-rate-bot.service`):

```ini
[Unit]
Description=FlowExchange Telegram Rate Bot
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/telegram-rate-bot
EnvironmentFile=/path/to/telegram-rate-bot/.env
ExecStart=/usr/bin/node index.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Замените:

- `User=www-data` — на пользователя, под которым запускаете (или уберите строку, чтобы запускать от root).
- `WorkingDirectory` и `EnvironmentFile` — на реальный путь к папке бота и к `.env`.

Затем:

```bash
sudo systemctl daemon-reload
sudo systemctl enable flowexchange-rate-bot
sudo systemctl start flowexchange-rate-bot
sudo systemctl status flowexchange-rate-bot
```

Логи:

```bash
journalctl -u flowexchange-rate-bot -f
```

### 4. Запуск через screen или tmux (без systemd)

```bash
cd /path/to/telegram-rate-bot
export BOT_TOKEN="..."
export CHANNEL="@Fl0wExchange"
screen -S rate-bot
node index.js
```

Отсоединиться: `Ctrl+A`, затем `D`. Вернуться: `screen -r rate-bot`.

Аналогично можно использовать `tmux`.

### 5. Проверка

- В канале должно появиться сообщение с курсом.
- Через минуту оно должно обновиться (то же сообщение, новый текст и время).
- При временной недоступности CoinGecko или Telegram бот не падает, пишет в лог и повторяет попытку на следующем интервале.

---

## Дополнительные переменные (опционально)

| Переменная           | Описание                          | По умолчанию   |
|----------------------|-----------------------------------|----------------|
| `MIN_DEAL_AMOUNT`    | Мин. сумма сделки в сообщении     | `20 000`       |
| `CONTACT`            | Контакт в сообщении               | `@Fl0wExchange`|

Пример в `.env`:

```
MIN_DEAL_AMOUNT=50 000
CONTACT=@Fl0wExchange
```
