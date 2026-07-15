#pragma once

#include "TradingEngine/trading_engine.h"

class EngineContext
{
public:
    static TradingEngine &getEngine()
    {
        static TradingEngine engine;
        return engine;
    }
};