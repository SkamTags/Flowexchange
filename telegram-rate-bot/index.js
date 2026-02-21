#!/usr/bin/env node
"use strict";

require("dotenv").config();

/**
 * Telegram-бот: публикует курс RUB/USDT в канал.
 * Раз в 60 секунд обновляет курс (источник — тот же, что на сайте: CoinGecko + спред).
 * Редактирует последнее сообщение в канале, не отправляет новое.
 * При недоступности API — пишет в лог, не падает.
 */

const INTERVAL_MS = 60 * 1000;
const COINGECKO_URL = "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=rub";
const USDT_BUY_SPREAD = 1.01411389;
const MIN_DEAL_AMOUNT = process.env.MIN_DEAL_AMOUNT || "20 000";
const CONTACT = process.env.CONTACT || "@Fl0wExchange";
const TIMEZONE = "Europe/Moscow";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL = process.env.CHANNEL;

if (!BOT_TOKEN || !CHANNEL) {
  console.error("Задайте BOT_TOKEN и CHANNEL в .env или в окружении.");
  process.exit(1);
}

let lastMessageId = null;

function log(msg, level = "info") {
  const ts = new Date().toISOString();
  const prefix = level === "error" ? "ERROR" : "INFO";
  console.log(`${ts} [${prefix}] ${msg}`);
}

function formatTimeUTC3() {
  const d = new Date();
  const formatter = new Intl.DateTimeFormat("ru-RU", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return formatter.format(d);
}

function buildMessage(price) {
  const line1 = "💱 Курс RUB/USDT";
  const line2 = "💲 Цена: " + price;
  const line3 = "💵 Мин. сумма сделки: " + MIN_DEAL_AMOUNT;
  const line4 = "📲 Связь: " + CONTACT;
  const line5 = "Обновлено: " + formatTimeUTC3() + " (UTC+3)";
  return [line1, line2, line3, line4, line5].join("\n");
}

async function fetchRate() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(COINGECKO_URL, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) {
      log("CoinGecko HTTP " + res.status, "error");
      return null;
    }
    const data = await res.json();
    const rub = data?.tether?.rub;
    if (rub == null || typeof rub !== "number" || rub <= 0) {
      log("CoinGecko: неверный ответ " + JSON.stringify(data), "error");
      return null;
    }
    const price = (rub * USDT_BUY_SPREAD).toFixed(2);
    return price;
  } catch (e) {
    clearTimeout(timeout);
    log("CoinGecko недоступен: " + (e.message || e), "error");
    return null;
  }
}

async function sendOrEditMessage(text) {
  const base = `https://api.telegram.org/bot${BOT_TOKEN}`;
  if (lastMessageId != null) {
    const url = base + "/editMessageText";
    const body = new URLSearchParams({
      chat_id: String(CHANNEL),
      message_id: String(lastMessageId),
      text,
    });
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      const data = await res.json();
      if (!data.ok) {
        log("Telegram editMessageText: " + (data.description || data), "error");
        lastMessageId = null;
        return false;
      }
      return true;
    } catch (e) {
      log("Telegram editMessageText запрос: " + (e.message || e), "error");
      return false;
    }
  }
  const url = base + "/sendMessage";
  const body = new URLSearchParams({
    chat_id: String(CHANNEL),
    text,
  });
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    const data = await res.json();
    if (!data.ok) {
      log("Telegram sendMessage: " + (data.description || data), "error");
      return false;
    }
    lastMessageId = data.result?.message_id ?? null;
    return true;
  } catch (e) {
    log("Telegram sendMessage запрос: " + (e.message || e), "error");
    return false;
  }
}

async function tick() {
  const price = await fetchRate();
  if (price == null) {
    log("Курс не получен, сообщение не обновляем.");
    return;
  }
  const text = buildMessage(price);
  const ok = await sendOrEditMessage(text);
  if (ok) {
    log("Курс обновлён: " + price);
  }
}

async function main() {
  log("Старт бота. Канал: " + CHANNEL + ", интервал: " + INTERVAL_MS / 1000 + " сек.");
  await tick();
  setInterval(tick, INTERVAL_MS);
}

main().catch((e) => {
  log("Критическая ошибка: " + (e.message || e), "error");
  process.exit(1);
});
