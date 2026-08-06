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
std::vector<Order> OrderRepository::getAllOrders()
{
    std::vector<Order> orders;

    auto dbClient = drogon::app().getDbClient();

    try
    {
        auto result = dbClient->execSqlSync(
            "SELECT id, symbol, type, price, original_quantity "
            "FROM orders "
            "ORDER BY id DESC");

        for (const auto &row : result)
        {
            OrderType orderType = OrderType::BUY;

            if (row["type"].as<std::string>() == "SELL")
            {
                orderType = OrderType::SELL;
            }

            Order order(
                row["symbol"].as<std::string>(),
                row["id"].as<unsigned int>(),
                orderType,
                row["price"].as<float>(),
                row["original_quantity"].as<float>());

            orders.push_back(order);
        }
    }
    catch (const drogon::orm::DrogonDbException &e)
    {
        std::cerr
            << "[Repository] Database Error: "
            << e.base().what()
            << std::endl;
    }

    return orders;
}

unsigned int OrderRepository::getNextOrderId()
{
    auto dbClient = drogon::app().getDbClient();

    try
    {
        auto result = dbClient->execSqlSync(
            "SELECT COALESCE(MAX(id), 0) AS max_id FROM orders");

        unsigned int maxId =
            result[0]["max_id"].as<unsigned int>();

        return maxId + 1;
    }
    catch (const drogon::orm::DrogonDbException &e)
    {
        std::cerr
            << "[Repository] Database Error: "
            << e.base().what()
            << std::endl;

        return 1;
    }
}

std::optional<Order> OrderRepository::getOrderById(unsigned int id)
{
    auto dbClient = drogon::app().getDbClient();
    auto result = dbClient->execSqlSync(
        "SELECT id,symbol,type,price,original_quantity FROM orders WHERE id=$1", id);

    if (result.empty())
        return std::nullopt;

    OrderType type = (result[0]["type"].as<std::string>() == "SELL")
                         ? OrderType::SELL
                         : OrderType::BUY;

    return Order(
        result[0]["symbol"].as<std::string>(),
        result[0]["id"].as<unsigned int>(),
        type,
        result[0]["price"].as<float>(),
        result[0]["original_quantity"].as<float>());
}

bool OrderRepository::updateOrder(const Order &order)
{
    auto dbClient = drogon::app().getDbClient();

    dbClient->execSqlSync(
        "UPDATE orders SET "
        "peak_quantity=$1,"
        "quantity_transacted=$2,"
        "total_quantity_transacted=$3,"
        "order_status=$4 "
        "WHERE id=$5",
        order.getPeakQuantity(),
        order.getQuantityTransacted(),
        order.getTotalQuantityTransacted(),
        static_cast<int>(order.getStatus()),
        order.getID());

    return true;
}

bool OrderRepository::deleteOrder(unsigned int id)
{
    auto dbClient = drogon::app().getDbClient();
    dbClient->execSqlSync("DELETE FROM orders WHERE id=$1", id);
    return true;
}
