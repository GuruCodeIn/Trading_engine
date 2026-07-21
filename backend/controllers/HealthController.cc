#include "HealthController.h"

#include <drogon/drogon.h>
#include <drogon/orm/DbClient.h>

using namespace drogon;

void HealthController::health(
    const HttpRequestPtr &req,
    std::function<void(const HttpResponsePtr &)> &&callback)
{
    Json::Value json;

    try
    {
        auto dbClient = drogon::app().getDbClient();

        auto result = dbClient->execSqlSync("SELECT current_database();");

        json["status"] = "ok";
        json["database"] = result[0]["current_database"].as<std::string>();
    }
    catch (const std::exception &exception)
    {
        json["status"] = "error";
        json["message"] = exception.what();
    }

    auto response = HttpResponse::newHttpJsonResponse(json);

    callback(response);
}