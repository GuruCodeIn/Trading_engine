#pragma once

#include <drogon/HttpController.h>

using namespace drogon;

class OrderController
    : public HttpController<OrderController>
{
public:
    METHOD_LIST_BEGIN

    ADD_METHOD_TO(
        OrderController::submitOrder,
        "/order",
        Post,
        Options);

    ADD_METHOD_TO(
        OrderController::getAllOrders,
        "/orders",
        Get);

    // NEW
    ADD_METHOD_TO(
        OrderController::cancelOrder,
        "/order/{1}/{2}",
        Delete,
        Options);

    METHOD_LIST_END

    void submitOrder(
        const HttpRequestPtr &req,
        std::function<void(
            const HttpResponsePtr &)> &&callback);

    void getAllOrders(
        const HttpRequestPtr &req,
        std::function<void(
            const HttpResponsePtr &)> &&callback);

    // NEW
    void cancelOrder(
        const HttpRequestPtr &req,
        std::function<void(
            const HttpResponsePtr &)> &&callback,
        std::string symbol,
        unsigned int orderId);
};