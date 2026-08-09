#include "../include/TradingEngine/trade_history.h"

void TradeHistory::addTrade(
    const Trade &trade)
{
    trades.push_back(trade);
}

const std::vector<Trade> &
TradeHistory::getTrades() const
{
    return trades;
}