#pragma once

#include "IOrderRepository.h"

class OrderRepository : public IOrderRepository
{
public:
    void saveOrder(const Order &order) override;
};