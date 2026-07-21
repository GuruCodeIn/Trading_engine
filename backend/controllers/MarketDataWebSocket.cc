#include "MarketDataWebSocket.h"

#include <iostream>

//------------------------------------------------------------
// Static member definitions
//------------------------------------------------------------

std::unordered_set<drogon::WebSocketConnectionPtr>
    MarketDataWebSocket::clients;

std::mutex
    MarketDataWebSocket::clientsMutex;

//------------------------------------------------------------
// WebSocket callbacks
//------------------------------------------------------------

using namespace drogon;

void MarketDataWebSocket::broadcast(const std::string &message)
{
    std::lock_guard<std::mutex> lock(clientsMutex);

    for (const auto &client : clients)
    {
        if (client)
        {
            client->send(message);
        }
    }
}

void MarketDataWebSocket::handleNewConnection(
    const HttpRequestPtr &req,
    const WebSocketConnectionPtr &wsConnPtr)
{
    {
        std::lock_guard<std::mutex> lock(clientsMutex);

        clients.insert(wsConnPtr);
    }

    std::cout
        << "[WebSocket] Client connected."
        << std::endl;

    std::cout
        << "[WebSocket] Total clients: "
        << clients.size()
        << std::endl;
}

void MarketDataWebSocket::handleNewMessage(
    const WebSocketConnectionPtr &wsConnPtr,
    std::string &&message,
    const WebSocketMessageType &type)
{
    std::cout
        << "[WebSocket] Message received: "
        << message
        << std::endl;

    broadcast(message);
}

void MarketDataWebSocket::handleConnectionClosed(
    const WebSocketConnectionPtr &wsConnPtr)
{
    {
        std::lock_guard<std::mutex> lock(clientsMutex);

        clients.erase(wsConnPtr);
    }

    std::cout
        << "[WebSocket] Client disconnected."
        << std::endl;

    std::cout
        << "[WebSocket] Total clients: "
        << clients.size()
        << std::endl;
}