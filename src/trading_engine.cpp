#include "../include/TradingEngine/trading_engine.h"

#include <iostream>

void TradingEngine::submitOrder(
    Order &order)
{
    std::cout
        << "[ENGINE] Processing Order "
        << order.getID()
        << std::endl;

    orderBooks[order.getSymbol()].processOrder(
        order,
        tradeHistory);

    std::cout
        << "[ENGINE] Trades Stored = "
        << tradeHistory.getTrades().size()
        << std::endl;
}

OrderBook &TradingEngine::getOrderBook(
    const std::string &symbol)
{
    return orderBooks[symbol];
}

TradeHistory &TradingEngine::getTradeHistory()
{
    return tradeHistory;
}

bool TradingEngine::cancelOrder(
    const std::string &symbol,
    unsigned int orderId)
{
    auto book =
        orderBooks.find(symbol);

    if (book == orderBooks.end())
    {
        return false;
    }

    return book->second.cancelOrder(
        orderId);
}