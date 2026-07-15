#pragma once

#include <drogon/HttpController.h>

using namespace drogon;

class OrderBookController : public HttpController<OrderBookController>
{
public:
    METHOD_LIST_BEGIN

    ADD_METHOD_TO(
        OrderBookController::getOrderBook,
        "/orderbook/{1}",
        Get);

    METHOD_LIST_END

    void getOrderBook(
        const HttpRequestPtr &req,
        std::function<void(const HttpResponsePtr &)> &&callback,
        const std::string &symbol);
};