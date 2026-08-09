#pragma once

#include <drogon/HttpController.h>

using namespace drogon;

class TradeController
    : public HttpController<TradeController>
{
public:
    METHOD_LIST_BEGIN

    ADD_METHOD_TO(
        TradeController::getAllTrades,
        "/trades",
        Get);

    METHOD_LIST_END

    void getAllTrades(
        const HttpRequestPtr &req,
        std::function<void(
            const HttpResponsePtr &)> &&callback);
};