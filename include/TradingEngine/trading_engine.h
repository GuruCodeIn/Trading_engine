#ifndef TRADING_ENGINE_H
#define TRADING_ENGINE_H

#include <string>
#include <unordered_map>

#include "order_book.h"

class TradingEngine
{
private:
    std::unordered_map<std::string, OrderBook> orderBooks;

public:
    TradingEngine() = default;

    void submitOrder(Order &order);

    OrderBook &getOrderBook(const std::string &symbol);

    // NEW
    bool cancelOrder(
        const std::string &symbol,
        unsigned int orderId);
};

#endif