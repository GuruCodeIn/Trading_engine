#include <iostream>

#include <drogon/drogon.h>

#include "EngineContext.h"

int main()
{
    // Initialize the Trading Engine
    auto &engine = EngineContext::getEngine();

    std::cout << "Trading Engine initialized successfully." << std::endl;

    (void)engine;

    drogon::app()
        .addListener("0.0.0.0", 5555)
        .run();

    return 0;
}