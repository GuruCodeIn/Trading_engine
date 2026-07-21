#pragma once

#include "../../include/TradingEngine/order.h"

class IOrderRepository
{
public:
    virtual ~IOrderRepository() = default;

    virtual void saveOrder(const Order &order) = 0;
};