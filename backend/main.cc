#include <iostream>

#include <drogon/drogon.h>

#include "EngineContext.h"

int main()
{
    auto &engine = EngineContext::getEngine();

    std::cout << "Trading Engine initialized successfully." << std::endl;

    (void)engine;

    try
    {
        drogon::app().loadConfigFile("../backend/config/config.json");
        std::cout << "Config loaded successfully." << std::endl;
    }
    catch (const std::exception &e)
    {
        std::cout << "Config load failed: " << e.what() << std::endl;
        return 1;
    }

    drogon::app().registerPostHandlingAdvice(
        [](const drogon::HttpRequestPtr &,
           const drogon::HttpResponsePtr &response)
        {
            response->addHeader("Access-Control-Allow-Origin", "http://localhost:5173");
            response->addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response->addHeader("Access-Control-Allow-Headers", "Content-Type");
        });

    drogon::app().run();

    return 0;
}