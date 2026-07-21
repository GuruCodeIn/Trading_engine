cmake_minimum_required(VERSION 3.16)

project(TradingEngine VERSION 1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Drogon CONFIG REQUIRED)

include_directories(
    include
    backend
)

# -----------------------
# Trading Engine Library
# -----------------------

add_library(TradingEngine
    src/trading_engine.cpp
    src/order.cpp
    src/order_book.cpp
    src/order_tree.cpp
    src/limit_order.cpp
    src/order_status.cpp
    src/order_type.cpp
    src/transactions.cpp
)

target_include_directories(TradingEngine
    PUBLIC
    include
)

# -----------------------
# Single Threaded Demo
# -----------------------

add_executable(single_threaded
    apps/single_threaded.cpp
)

target_link_libraries(single_threaded
    TradingEngine
)

# -----------------------
# Multi Threaded Demo
# -----------------------

add_executable(multi_threaded
    apps/multi_threaded.cpp
)

target_link_libraries(multi_threaded
    TradingEngine
)

# -----------------------
# Backend
# -----------------------

add_executable(TradingBackend
    backend/main.cc

    backend/controllers/HealthController.cc
    backend/controllers/OrderController.cc
    backend/controllers/OrderBookController.cc
    backend/controllers/MarketDataWebSocket.cc

    backend/services/TradingService.cc

    backend/repositories/OrderRepository.cc
)

target_include_directories(TradingBackend
    PRIVATE
    backend
)

target_link_libraries(TradingBackend
    PRIVATE
    TradingEngine
    Drogon::Drogon
)