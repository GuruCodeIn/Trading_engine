#include "../include/TradingEngine/trade.h"

Trade::Trade(
    unsigned int tradeId,
    unsigned int buyOrderId,
    unsigned int sellOrderId,
    const std::string &symbol,
    float price,
    float quantity)
    : tradeId(tradeId),
      buyOrderId(buyOrderId),
      sellOrderId(sellOrderId),
      symbol(symbol),
      price(price),
      quantity(quantity)
{
}

unsigned int Trade::getTradeId() const
{
    return tradeId;
}

unsigned int Trade::getBuyOrderId() const
{
    return buyOrderId;
}

unsigned int Trade::getSellOrderId() const
{
    return sellOrderId;
}

const std::string &Trade::getSymbol() const
{
    return symbol;
}

float Trade::getPrice() const
{
    return price;
}

float Trade::getQuantity() const
{
    return quantity;
}