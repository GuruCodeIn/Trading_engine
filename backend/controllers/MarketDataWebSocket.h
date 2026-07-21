#pragma once

#include <unordered_set>
#include <mutex>

#include <drogon/WebSocketController.h>

class MarketDataWebSocket
    : public drogon::WebSocketController<MarketDataWebSocket>
{
public:
    void handleNewMessage(
        const drogon::WebSocketConnectionPtr &wsConnPtr,
        std::string &&message,
        const drogon::WebSocketMessageType &type) override;

    void handleNewConnection(
        const drogon::HttpRequestPtr &req,
        const drogon::WebSocketConnectionPtr &wsConnPtr) override;

    void handleConnectionClosed(
        const drogon::WebSocketConnectionPtr &wsConnPtr) override;

public:
    // Stores all currently connected WebSocket clients
    static std::unordered_set<drogon::WebSocketConnectionPtr> clients;

    // Protects the clients container when accessed by multiple threads
    static std::mutex clientsMutex;

public:
    static void broadcast(const std::string &message);

    WS_PATH_LIST_BEGIN
    WS_PATH_ADD("/ws/market");
    WS_PATH_LIST_END
};