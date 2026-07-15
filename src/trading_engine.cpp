#include "../include/TradingEngine/trading_engine.h"

void TradingEngine::submitOrder(Order &order)
{
    orderBooks[order.getSymbol()].processOrder(order);
}

OrderBook &TradingEngine::getOrderBook(const std::string &symbol)
{
    return orderBooks[symbol];
}