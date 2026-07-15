#include "OrderBookController.h"

#include <json/json.h>

void OrderBookController::getOrderBook(
    const HttpRequestPtr &req,
    std::function<void(const HttpResponsePtr &)> &&callback,
    const std::string &symbol)
{
    Json::Value response;

    response["success"] = true;
    response["symbol"] = symbol;
    response["message"] = "OrderBook endpoint is working.";

    callback(HttpResponse::newHttpJsonResponse(response));
}