#include "../include/TradingEngine/order.h"
#include "../include/TradingEngine/limit_order.h"
#include "../include/TradingEngine/transactions.h"
#include "../include/TradingEngine/order_tree.h"
#include "../include/TradingEngine/order_book.h"
#include "../include/TradingEngine/trade_history.h"

#include <chrono>
#include <random>

#include <iostream>
using std::cout;
using std::endl;

#include <string>
using std::string;

#include <vector>
using std::vector;

#include <functional>

#include <thread>
using std::thread;

#include <random>
using std::mt19937;
using std::uniform_real_distribution;

/* Function to create list of orders */
vector<Order> generateRandomOrders(int num_order, unsigned int seed)
{
    unsigned int order_id = 0;

    /* Mersenne Twister random number generator with distribution to generate Order properties */
    mt19937 rng(seed);
    uniform_real_distribution<float> price_distribution(1.0f, 100.0f);
    uniform_real_distribution<float> qty_distribution(10.0f, 1000.0f);

    vector<Order> orders;
    orders.reserve(num_order);

    for (int i = 0; i < num_order; ++i)
    {
        order_id += 1;

        string order_symbol =
            (rng() % 2 == 0) ? "BTC" : "ETH";

        OrderType order_type =
            (rng() % 2 == 0)
                ? OrderType::BUY
                : OrderType::SELL;

        float order_price =
            price_distribution(rng);

        float order_qty =
            qty_distribution(rng);

        orders.emplace_back(
            Order(
                std::move(order_symbol),
                std::move(order_id),
                std::move(order_type),
                std::move(order_price),
                std::move(order_qty)));
    }

    return orders;
}

int main()
{
    /* Create your OrderBook objects */
    OrderBook orderBookETH;
    OrderBook orderBookBTC;

    /* Shared Trade History */
    TradeHistory tradeHistory;

    /* Create list of orders */
    auto orders = generateRandomOrders(100'000, 1);

    /* Start the timer */
    auto startTime =
        std::chrono::high_resolution_clock::now();

    for (auto &order : orders)
    {
        /* Process the order through the order book */
        if (order.getSymbol() == "BTC")
        {
            orderBookBTC.processOrder(
                order,
                tradeHistory);
        }
        else
        {
            orderBookETH.processOrder(
                order,
                tradeHistory);
        }
    }

    /* Stop the timer */
    auto endTime =
        std::chrono::high_resolution_clock::now();

    /* Calculate the elapsed time in seconds */
    double elapsedTime =
        std::chrono::duration<double>(
            endTime - startTime)
            .count();

    /* Print the overall elapsed time with results */
    cout << orderBookETH.getResults() + orderBookBTC.getResults()
         << endl;

    cout << "-------------------------------------------------------"
         << endl;

    cout << "A total of "
         << orderBookBTC.getTotalOrdersSubmitted() + orderBookETH.getTotalOrdersSubmitted()
         << " orders submitted "
         << endl;

    cout << "\033[33m"
         << "A total of "
         << orderBookBTC.getTotalOrdersUnfulfilled() + orderBookETH.getTotalOrdersUnfulfilled()
         << " orders still within OrderBook "
         << "\033[0m"
         << endl;

    cout << "\033[32m"
         << "A total of "
         << orderBookBTC.getTotalOrdersFulfilled() + orderBookETH.getTotalOrdersFulfilled()
         << " orders were fulfilled in "
         << elapsedTime
         << " seconds"
         << "\033[0m"
         << endl;

    return 0;
}