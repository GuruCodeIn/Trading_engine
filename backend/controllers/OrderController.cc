#include "OrderController.h"

#include "../services/TradingService.h"

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

    std::string symbol =
        (*json)["symbol"].asString();

    double price =
        (*json)["price"].asDouble();

    int quantity =
        (*json)["quantity"].asInt();

    std::string side =
        (*json)["side"].asString();

    std::string orderType =
        (*json)["orderType"].asString();

    OrderType engineSide;

    if (side == "BUY")
    {
        engineSide = OrderType::BUY;
    }
    else
    {
        engineSide = OrderType::SELL;
    }

    static unsigned int nextOrderId = 1;

    Order order(
        symbol,
        nextOrderId++,
        engineSide,
        static_cast<float>(price),
        static_cast<float>(quantity));

    TradingService tradingService;
    tradingService.submitOrder(order);

    Json::Value response;

    response["success"] = true;
    response["message"] =
        "Order submitted successfully.";

    response["order"]["id"] =
        order.getID();

    response["order"]["symbol"] =
        order.getSymbol();

    response["order"]["side"] =
        side;

    response["order"]["orderType"] =
        orderType;

    response["order"]["price"] =
        order.getPrice();

    response["order"]["quantity"] =
        order.getOriginalQuantity();

    callback(
        HttpResponse::newHttpJsonResponse(response));
}