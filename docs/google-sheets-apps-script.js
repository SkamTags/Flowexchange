/**
 * Скрипт для приёма заявок с сайта и записи в Google Таблицу + дублирование в Telegram.
 *
 * Как подключить:
 * 1. Создайте новую Google Таблицу (sheets.google.com).
 * 2. Расширения → Apps Script. Удалите пример кода и вставьте этот скрипт целиком.
 * 3. Настройте Telegram: Проект (шестерёнка) → Свойства проекта → Свойства скрипта:
 *    - TELEGRAM_BOT_TOKEN_1 — первая часть токена (до двоеточия, например 8200442114)
 *    - TELEGRAM_BOT_TOKEN_2 — вторая часть токена (после двоеточия, длинная строка от BotFather)
 *    - TELEGRAM_CHAT_ID — ID чата (напишите боту, затем откройте в браузере
 *      https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates и найдите message.chat.id)
 * 4. Сохраните проект (Ctrl+S). Выполните один раз doPost (или запустите тест) и выдайте доступ при первом запросе.
 * 5. Развернуть → Управление развёртываниями → Создать → Тип «Веб-приложение»:
 *    - Выполнять от имени: меня
 *    - У кого есть доступ: любой пользователь (или «все»)
 * 6. Скопируйте URL веб-приложения и вставьте его в app.js в константу GOOGLE_SHEETS_WEB_APP_URL.
 *
 * В таблице в первой строке будут заголовки, далее — по одной строке на заявку.
 * Если TELEGRAM_BOT_TOKEN_1, TELEGRAM_BOT_TOKEN_2 и TELEGRAM_CHAT_ID заданы, каждая заявка дублируется в Telegram.
 */

function doGet(e) {
  if (e && e.parameter && (e.parameter.contact || e.parameter.fromAmount)) {
    try {
      appendRowFromParams(e.parameter);
    } catch (err) {
      return ContentService.createTextOutput("Error: " + err.toString()).setMimeType(ContentService.MimeType.TEXT);
    }
  }
  return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
}

function toPairCode(code) {
  if (!code) return "";
  if (code === "cash_rub") return "RUB";
  if (code === "usdt_trc20") return "USDT";
  if (code === "btc") return "BTC";
  return code;
}

function formatDateMSK(isoOrDate) {
  var d = isoOrDate ? new Date(isoOrDate) : new Date();
  return Utilities.formatDate(d, "Europe/Moscow", "dd.MM.yyyy HH:mm");
}

function formatOrderMessage(p) {
  var direction = toPairCode(p.fromCurrency) + " → " + toPairCode(p.toCurrency);
  var lines = [
    "🆕 Новая заявка",
    "",
    "Направление: " + direction,
    "Отдаёт: " + (p.fromAmount || "—"),
    "Получает: " + (p.toAmount || "—"),
    "Контакт (" + (p.contactType || "telegram") + "): " + (p.contact || "—"),
    "",
    formatDateMSK(p.date)
  ];
  return lines.join("\n");
}

/**
 * Отправляет сообщение в Telegram. Возвращает { ok: true } или { ok: false, error: "текст" }.
 */
function sendTelegramMessage(text) {
  var props = PropertiesService.getScriptProperties();
  var part1 = (props.getProperty("TELEGRAM_BOT_TOKEN_1") || "").trim();
  var part2 = (props.getProperty("TELEGRAM_BOT_TOKEN_2") || "").trim();
  var token = part1 && part2 ? part1 + ":" + part2 : "";
  var chatIdRaw = (props.getProperty("TELEGRAM_CHAT_ID") || "").trim();
  if (!token || !chatIdRaw) {
    var msg = "Telegram: в Свойствах скрипта задайте TELEGRAM_BOT_TOKEN_1, TELEGRAM_BOT_TOKEN_2 и TELEGRAM_CHAT_ID. Сейчас: part1=" + (part1 ? "есть" : "нет") + ", part2=" + (part2 ? "есть" : "нет") + ", chatId=" + (chatIdRaw ? "есть" : "нет");
    Logger.log(msg);
    return { ok: false, error: msg };
  }
  var chatId = /^-?\d+$/.test(chatIdRaw) ? parseInt(chatIdRaw, 10) : chatIdRaw;
  var url = "https://api.telegram.org/bot" + token + "/sendMessage";
  var payload = {
    chat_id: chatId,
    text: text,
    disable_web_page_preview: true
  };
  try {
    var response = UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });
    var code = response.getResponseCode();
    var body = response.getContentText();
    Logger.log("Telegram HTTP " + code + ": " + body);
    if (code !== 200) {
      return { ok: false, error: "HTTP " + code + " " + body };
    }
    var json = JSON.parse(body);
    if (!json.ok) {
      return { ok: false, error: json.description || body };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.toString() };
  }
}

/** Пишет результат проверки Telegram в лист "Лог" таблицы — открой таблицу и посмотри. */
function writeTelegramLog(message, isError) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Лог");
    if (!sheet) {
      sheet = ss.insertSheet("Лог");
    }
    sheet.getRange("A1").setValue("Последняя проверка Telegram");
    sheet.getRange("A2").setValue(new Date().toString());
    sheet.getRange("A3").setValue(isError ? "Ошибка:" : "Статус:");
    sheet.getRange("A4").setValue(message);
    if (isError) sheet.getRange("A4").setFontColor("#c00");
  } catch (e) {
    Logger.log("writeTelegramLog: " + e);
  }
}

/**
 * Запусти эту функцию вручную (Выполнить → testTelegramSend).
 * Потом открой саму Google Таблицу — в ней появится лист "Лог" с результатом (ОК или текст ошибки).
 */
function testTelegramSend() {
  var result = sendTelegramMessage("Тест: если вы это видите, бот настроен.");
  if (result.ok) {
    writeTelegramLog("Сообщение отправлено. Проверь чат с ботом в Telegram.", false);
    Logger.log("Успех.");
  } else {
    writeTelegramLog(result.error, true);
    throw new Error("Telegram: " + result.error);
  }
}

function appendRowFromParams(p) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var headers = ["Дата", "Пара", "Сторона", "Цена", "Количество"];
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
  var fromCode = toPairCode(p.fromCurrency);
  var toCode = toPairCode(p.toCurrency);
  var pair = fromCode + "/" + toCode;
  var side = (p.toCurrency === "cash_rub") ? "SELL" : "BUY";
  var row = [
    formatDateMSK(p.date),
    pair,
    side,
    p.toAmount || "",
    p.fromAmount || ""
  ];
  sheet.appendRow(row);
  try {
    var tg = sendTelegramMessage(formatOrderMessage(p));
    if (!tg.ok) writeTelegramLog(tg.error, true);
  } catch (e) {
    writeTelegramLog(e.toString(), true);
  }
}

function doPost(e) {
  try {
    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = {
        date: e.parameter.date || "",
        fromCurrency: e.parameter.fromCurrency || "",
        toCurrency: e.parameter.toCurrency || "",
        fromAmount: e.parameter.fromAmount || "",
        toAmount: e.parameter.toAmount || "",
        contactType: e.parameter.contactType || "telegram",
        contact: e.parameter.contact || ""
      };
    }
    if (!data.date) data.date = new Date().toISOString();
    appendRowFromParams(data);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
