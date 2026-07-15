#include "HealthController.h"

using namespace drogon;

void HealthController::health(
    const HttpRequestPtr &req,
    std::function<void(const HttpResponsePtr &)> &&callback)
{
    Json::Value json;

    json["status"] = "ok";

    auto response = HttpResponse::newHttpJsonResponse(json);

    callback(response);
}