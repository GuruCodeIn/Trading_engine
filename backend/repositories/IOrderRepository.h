#pragma once

#include "../../include/TradingEngine/order.h"

#include <vector>

class IOrderRepository
{
public:
    virtual ~IOrderRepository() = default;

    virtual void saveOrder(const Order &order) = 0;

    virtual std::vector<Order> getAllOrders() = 0;

    virtual unsigned int getNextOrderId() = 0;
};