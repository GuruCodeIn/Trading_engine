#include "OrderController.h"

#include "../EngineContext.h"

#include "../../include/TradingEngine/order.h"
#include "../../include/TradingEngine/order_type.h"

#include <json/json.h>
#include <string>

void OrderController::submitOrder(
    const HttpRequestPtr &req,
    std::function<void(const HttpResponsePtr &)> &&callback)
{
    auto json = req->getJsonObject();

    if (!json)
    {
        Json::Value error;

        error["success"] = false;
        error["message"] = "Invalid JSON request.";

        callback(HttpResponse::newHttpJsonResponse(error));
        return;
    }

    // Read values from JSON
    std::string symbol = (*json)["symbol"].asString();
    std::string typeString = (*json)["type"].asString();
    double price = (*json)["price"].asDouble();
    int quantity = (*json)["quantity"].asInt();

    // Convert string to OrderType
    OrderType orderType;

    if (typeString == "BUY")
    {
        orderType = OrderType::BUY;
    }
    else
    {
        orderType = OrderType::SELL;
    }

    // Generate temporary Order ID
    static unsigned int nextOrderId = 1;

    // Create Order object
    Order order(
        symbol,
        nextOrderId++,
        orderType,
        static_cast<float>(price),
        static_cast<float>(quantity));
    EngineContext::getEngine().submitOrder(order);

    // Create response
    Json::Value response;

    response["success"] = true;
    response["message"] = "Order submitted successfully.";

    response["order"]["id"] = order.getID();
    response["order"]["symbol"] = order.getSymbol();
    response["order"]["type"] = typeString;
    response["order"]["price"] = order.getPrice();
    response["order"]["quantity"] = order.getOriginalQuantity();

    callback(HttpResponse::newHttpJsonResponse(response));
}