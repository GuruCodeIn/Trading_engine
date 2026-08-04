#include "OrderRepository.h"
#include <drogon/drogon.h>
#include <optional>
#include <iostream>

// Append these methods below your existing implementation.

std::optional<Order> OrderRepository::getOrderById(unsigned int id)
{
    auto dbClient=drogon::app().getDbClient();
    auto result=dbClient->execSqlSync(
        "SELECT id,symbol,type,price,original_quantity FROM orders WHERE id=$1",id);

    if(result.empty()) return std::nullopt;

    OrderType type=(result[0]["type"].as<std::string>()=="SELL")
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
    auto dbClient=drogon::app().getDbClient();

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
    auto dbClient=drogon::app().getDbClient();
    dbClient->execSqlSync("DELETE FROM orders WHERE id=$1",id);
    return true;
}
