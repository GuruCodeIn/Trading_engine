#include "TradeController.h"

#include "../services/TradingService.h"

#include <json/json.h>

void TradeController::getAllTrades(
    const HttpRequestPtr &req,
    std::function<void(
        const HttpResponsePtr &)> &&callback)
{
    TradingService tradingService;

    const auto &trades =
        tradingService
            .getTradeHistory()
            .getTrades();

    Json::Value response;

    response["success"] = true;

    for (const auto &trade : trades)
    {
        Json::Value item;

        item["tradeId"] = trade.getTradeId();
        item["buyOrderId"] = trade.getBuyOrderId();
        item["sellOrderId"] = trade.getSellOrderId();
        item["symbol"] = trade.getSymbol();
        item["price"] = trade.getPrice();
        item["quantity"] = trade.getQuantity();

        response["trades"].append(item);
    }

    auto httpResponse =
        HttpResponse::newHttpJsonResponse(response);

    callback(httpResponse);
}