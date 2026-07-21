#include "OrderRepository.h"

#include <iostream>

#include <drogon/drogon.h>
#include <drogon/orm/DbClient.h>

namespace
{
    std::string orderTypeToString(const OrderType &type)
    {
        switch (type)
        {
        case OrderType::BUY:
            return "BUY";

        case OrderType::SELL:
            return "SELL";

        default:
            return "UNKNOWN";
        }
    }

    std::string orderStatusToString(const OrderStatus &status)
    {
        switch (status)
        {
        case OrderStatus::NEW_ORDER:
            return "NEW_ORDER";

        case OrderStatus::PARTIALLY_FILLED:
            return "PARTIALLY_FILLED";

        case OrderStatus::FULFILLED:
            return "FULFILLED";

        case OrderStatus::STORED:
            return "STORED";

        default:
            return "UNKNOWN";
        }
    }
}

void OrderRepository::saveOrder(const Order &order)
{
    auto dbClient = drogon::app().getDbClient();

    try
    {
        dbClient->execSqlSync(
            "INSERT INTO orders "
            "(id, symbol, type, price, original_quantity, "
            "peak_quantity, quantity_transacted, "
            "total_quantity_transacted, order_status) "
            "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",

            order.getID(),
            order.getSymbol(),
            orderTypeToString(order.getType()),
            order.getPrice(),
            order.getOriginalQuantity(),
            order.getPeakQuantity(),
            order.getQuantityTransacted(),
            order.getTotalQuantityTransacted(),
            orderStatusToString(order.getStatus()));

        std::cout
            << "[Repository] Order saved to PostgreSQL."
            << std::endl;
    }
    catch (const drogon::orm::DrogonDbException &e)
    {
        std::cerr
            << "[Repository] Database Error: "
            << e.base().what()
            << std::endl;
    }
}