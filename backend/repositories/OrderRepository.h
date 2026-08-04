#pragma once

#include "IOrderRepository.h"
#include <optional>
#include <vector>

class OrderRepository : public IOrderRepository
{
public:
    void saveOrder(const Order &order) override;
    std::vector<Order> getAllOrders() override;
    unsigned int getNextOrderId() override;

    std::optional<Order> getOrderById(unsigned int id);
    bool updateOrder(const Order &order);
    bool deleteOrder(unsigned int id);
};
