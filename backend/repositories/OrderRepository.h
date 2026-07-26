#pragma once

#include "IOrderRepository.h"

#include <vector>

class OrderRepository : public IOrderRepository
{
public:
    void saveOrder(const Order &order) override;

    std::vector<Order> getAllOrders() override;

    unsigned int getNextOrderId() override;
};