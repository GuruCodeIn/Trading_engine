#include "OrderBookController.h"

#include "../services/TradingService.h"

#include "../../include/TradingEngine/trading_engine.h"
#include "../../include/TradingEngine/order_book.h"

#include <json/json.h>

void OrderBookController::getOrderBook(
    const HttpRequestPtr &req,
    std::function<void(const HttpResponsePtr &)> &&callback,
    const std::string &symbol)
{
    Json::Value response;
    TradingService tradingService;

    OrderBook &orderBook =
        tradingService.getOrderBook(symbol);

    response["success"] = true;
    response["symbol"] = symbol;

    response["totalOrdersSubmitted"] = orderBook.getTotalOrdersSubmitted();
    response["totalOrdersFulfilled"] = orderBook.getTotalOrdersFulfilled();
   response["totalOrdersUnfulfilled"] = orderBook.getTotalOrdersUnfulfilled();

   Json::Value buyOrders(Json::arrayValue);

   for (const auto &level : orderBook.getBuyPriceLevels())
   {
       Json::Value order;

       order["price"] = level.first;
       order["orderCount"] = level.second;

       buyOrders.append(order);
   }

   response["buyOrders"] = buyOrders;

   Json::Value sellOrders(Json::arrayValue);

   for (const auto &level : orderBook.getSellPriceLevels())
   {
       Json::Value order;

       order["price"] = level.first;
       order["orderCount"] = level.second;

       sellOrders.append(order);
   }

   response["sellOrders"] = sellOrders;

   callback(HttpResponse::newHttpJsonResponse(response));
}