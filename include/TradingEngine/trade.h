#ifndef TRADING_ENGINE_SOURCE_HEADERS_TRADE_H_
#define TRADING_ENGINE_SOURCE_HEADERS_TRADE_H_

#pragma once

#include <string>

class Trade
{
private:
    unsigned int tradeId;

    unsigned int buyOrderId;

    unsigned int sellOrderId;

    std::string symbol;

    float price;

    float quantity;

public:
    Trade(
        unsigned int tradeId,
        unsigned int buyOrderId,
        unsigned int sellOrderId,
        const std::string &symbol,
        float price,
        float quantity);

    unsigned int getTradeId() const;

    unsigned int getBuyOrderId() const;

    unsigned int getSellOrderId() const;

    const std::string &getSymbol() const;

    float getPrice() const;

    float getQuantity() const;
};

#endif