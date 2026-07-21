#pragma once

#include "../../include/TradingEngine/trading_engine.h"
#include "../EngineContext.h"
#include "../repositories/OrderRepository.h"

class TradingService
{
private:
    OrderRepository orderRepository;

public:
    TradingEngine &getEngine();

    void submitOrder(Order &order);

    OrderBook &getOrderBook(const std::string &symbol);
};