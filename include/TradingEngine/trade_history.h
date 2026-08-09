#ifndef TRADING_ENGINE_SOURCE_HEADERS_TRADE_HISTORY_H_
#define TRADING_ENGINE_SOURCE_HEADERS_TRADE_HISTORY_H_

#pragma once

#include <vector>

#include "trade.h"

class TradeHistory
{
private:
    std::vector<Trade> trades;

public:
    TradeHistory() = default;

    void addTrade(
        const Trade &trade);

    const std::vector<Trade> &
    getTrades() const;
};

#endif