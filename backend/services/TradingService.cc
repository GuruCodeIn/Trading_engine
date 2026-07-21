#include "TradingService.h"
#include "../controllers/MarketDataWebSocket.h"

#include <json/json.h>

TradingEngine &TradingService::getEngine()
{
    return EngineContext::getEngine();
}

void TradingService::submitOrder(Order &order)
{
    getEngine().submitOrder(order);

    orderRepository.saveOrder(order);

    Json::Value message;

    message["event"] = "order_created";

    message["order"]["id"] = order.getID();
    message["order"]["symbol"] = order.getSymbol();
    message["order"]["type"] =
        (order.getType() == OrderType::BUY) ? "BUY" : "SELL";
    message["order"]["price"] = order.getPrice();
    message["order"]["quantity"] = order.getOriginalQuantity();

    Json::StreamWriterBuilder writer;

    std::string jsonMessage =
        Json::writeString(writer, message);

    MarketDataWebSocket::broadcast(jsonMessage);
}

OrderBook &TradingService::getOrderBook(const std::string &symbol)
{
    return getEngine().getOrderBook(symbol);
}