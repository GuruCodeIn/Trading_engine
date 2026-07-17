#include "OrderBookController.h"

#include "../EngineContext.h"

#include "../../include/TradingEngine/trading_engine.h"
#include "../../include/TradingEngine/order_book.h"

#include <json/json.h>

void OrderBookController::getOrderBook(
    const HttpRequestPtr &req,
    std::function<void(const HttpResponsePtr &)> &&callback,
    const std::string &symbol)
{
    Json::Value response;
    OrderBook &orderBook = EngineContext::getEngine().getOrderBook(symbol);

    response["success"] = true;
    response["symbol"] = symbol;

    response["totalOrdersSubmitted"] = orderBook.getTotalOrdersSubmitted();
    response["totalOrdersFulfilled"] = orderBook.getTotalOrdersFulfilled();
   response["totalOrdersUnfulfilled"] = orderBook.getTotalOrdersUnfulfilled();

    callback(HttpResponse::newHttpJsonResponse(response));
}