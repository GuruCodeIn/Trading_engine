#ifndef TRADING_ENGINE_H
#define TRADING_ENGINE_H

#include <string>
#include <unordered_map>

#include "order_book.h"
#include "trade_history.h"

class TradingEngine
{
private:
    std::unordered_map<std::string, OrderBook> orderBooks;
    TradeHistory tradeHistory;

public:
    TradingEngine() = default;

    void submitOrder(
        Order &order);

    OrderBook &getOrderBook(
        const std::string &symbol);

    TradeHistory &getTradeHistory();

    bool cancelOrder(
        const std::string &symbol,
        unsigned int orderId);
};

#endif