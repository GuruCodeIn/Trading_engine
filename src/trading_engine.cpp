#include "../include/TradingEngine/trading_engine.h"

void TradingEngine::submitOrder(Order &order)
{
    orderBooks[order.getSymbol()].processOrder(order);
}

OrderBook &TradingEngine::getOrderBook(
    const std::string &symbol)
{
    return orderBooks[symbol];
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