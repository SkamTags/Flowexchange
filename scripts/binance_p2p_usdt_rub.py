#!/usr/bin/env python3
"""
Получает актуальный курс USDT → RUB с Binance P2P (объявления на покупку USDT за рубли).
Без API-ключей. Выводит лучшую и среднюю цену в консоль.
"""

import requests

URL = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search"
TIMEOUT_SEC = 15

PAYLOAD = {
    "asset": "USDT",
    "fiat": "RUB",
    "tradeType": "BUY",
    "page": 1,
    "rows": 5,
}

HEADERS = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "User-Agent": "Mozilla/5.0 (compatible; FlowExchange/1.0)",
}


def get_usdt_rub_p2p_prices():
    """Запрашивает P2P объявления и возвращает список цен (float) или пустой список при ошибке."""
    try:
        r = requests.post(URL, json=PAYLOAD, headers=HEADERS, timeout=TIMEOUT_SEC)
        r.raise_for_status()
    except requests.exceptions.Timeout:
        print("Ошибка: таймаут запроса к Binance P2P")
        return []
    except requests.exceptions.RequestException as e:
        print(f"Ошибка запроса: {e}")
        return []

    try:
        data = r.json()
    except ValueError:
        print("Ошибка: не удалось разобрать ответ как JSON")
        return []

    items = data.get("data") or []
    prices = []
    for item in items[:5]:
        adv = item.get("adv") or {}
        raw = adv.get("price")
        if raw is None:
            continue
        try:
            prices.append(float(str(raw).replace(" ", "").replace(",", ".")))
        except (ValueError, TypeError):
            continue
    return prices


def main():
    prices = get_usdt_rub_p2p_prices()
    if not prices:
        print("Не удалось получить ни одной цены из объявлений.")
        return

    best = min(prices)
    avg = sum(prices) / len(prices)

    print("Курс USDT → RUB (Binance P2P, BUY, первые 5 объявлений):")
    print(f"  Лучшая цена:  {best:.2f} ₽")
    print(f"  Средняя цена: {avg:.2f} ₽")


if __name__ == "__main__":
    main()
