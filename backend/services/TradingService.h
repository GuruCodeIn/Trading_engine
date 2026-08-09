#pragma once

#include "../../include/TradingEngine/trading_engine.h"
#include "../../include/TradingEngine/order.h"
#include "../../include/TradingEngine/trade_history.h"

#include "../EngineContext.h"
#include "../repositories/OrderRepository.h"

#include <vector>

class TradingService
{
private:
    OrderRepository orderRepository;


public:
    TradingEngine &getEngine();

    void submitOrder(Order &order);

    OrderBook &getOrderBook(
        const std::string &symbol);

    std::vector<Order> getAllOrders();

    // Access all executed trades
    TradeHistory &getTradeHistory();

    // NEW
    bool cancelOrder(
        const std::string &symbol,
        unsigned int orderId);
};