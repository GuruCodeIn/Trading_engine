#include "../include/TradingEngine/order_book.h"

// #pragma once
#include <cmath>
#include <algorithm>

#include <sstream>
using std::ostringstream;

#include <fstream>

#include <iostream>
using std::cout;
using std::endl;

#include <memory>
using std::shared_ptr;

#include "../include/TradingEngine/transactions.h" 
#include "../include/TradingEngine/order_type.h"
#include "../include/TradingEngine/order_status.h"
#include "../include/TradingEngine/order.h"
#include "../include/TradingEngine/limit_order.h"
#include "../include/TradingEngine/order_tree.h"

OrderTree& OrderBook::getBuyTree() {
	return buy_tree;
}

OrderTree& OrderBook::getSellTree() {
	return sell_tree;
}

const std::map<float, int> &OrderBook::getBuyPriceLevels() const
{
    return buy_tree.getPriceLevels();
}

const std::map<float, int> &OrderBook::getSellPriceLevels() const
{
    return sell_tree.getPriceLevels();
}

OrderTree& OrderBook::getOrderTreeByOrderType(const OrderType& order_type) {

	return (order_type == OrderType::BUY) ? buy_tree : sell_tree;
}

int OrderBook::getTotalOrdersSubmitted() const
{
    return total_orders_submitted;
}

int OrderBook::getTotalOrdersFulfilled() const
{
    return total_orders_submitted -
           static_cast<int>(buy_tree.getLength() + sell_tree.getLength());
}

int OrderBook::getTotalOrdersUnfulfilled() const
{
    return static_cast<int>(buy_tree.getLength() + sell_tree.getLength());
}

string OrderBook::getResults() {
	return output_data.str();
}

/* Execute incoming_order or store if it's not completelty filled */
void OrderBook::processOrder(Order& incoming_order) {

    /* Update Total Orders submitted */
    total_orders_submitted++;

	/* Store placed order */
	incoming_order.storeOrderInfo(output_data, "\033[0m");

	/* Pick the appropriate Tree */
	OrderTree& matching_tree = (incoming_order.getType() == OrderType::BUY) ? sell_tree : buy_tree;

	/* Match the incoming_order */
	matching_tree.matchPriceOrder(incoming_order, output_data);

	/* Check if the Order has been fully matched, if not we will add it to its appropriate tree */
	if (incoming_order.getStatus() == OrderStatus::FULFILLED) {

		/* Store fulfilled order */
		incoming_order.storeOrderInfo(output_data, "\033[32m");
	}

	else {

		/* Update and store Order */
		incoming_order.setOrderStatus(OrderStatus::STORED);
		incoming_order.storeOrderInfo(output_data, "\033[33m");

		/* Place in appropriate Tree */
		OrderTree& storing_tree = (incoming_order.getType() == OrderType::BUY) ? buy_tree : sell_tree;
		storing_tree.addPriceOrder(incoming_order);

	}

	if (incoming_order.getID() == 75000) {
		getCurrentSnapshot();
	}

	 return;
 }

 bool OrderBook::cancelOrder(
     unsigned int orderId)
 {
     auto buyOrder =
         buy_tree.order_lookup.find(
             orderId);

     if (
         buyOrder !=
         buy_tree.order_lookup.end())
     {
         buy_tree.deletePriceOrder(
             buyOrder->second);

         return true;
     }

     auto sellOrder =
         sell_tree.order_lookup.find(
             orderId);

     if (
         sellOrder !=
         sell_tree.order_lookup.end())
     {
         sell_tree.deletePriceOrder(
             sellOrder->second);

         return true;
     }

     return false;
 }

void OrderBook::getCurrentSnapshot() {
    // Sort the Buy by price in descending order (reverse=True)
    std::vector<std::pair<float, float>> sorted_buys(buy_tree.order_tree.begin(), buy_tree.order_tree.end());
    std::sort(sorted_buys.begin(), sorted_buys.end(), [](const auto& b1, const auto& b2) {
        return b1.first > b2.first;
        });

    // Calculate the cumulative size for bids
    for (size_t i = 1; i < sorted_buys.size(); ++i) {
        sorted_buys[i].second += sorted_buys[i - 1].second;
    }

    std::ofstream out_buy_prices("output_buy_prices.txt");

    // Write bid prices to the file on one line
    for (const auto& buy : sorted_buys) {
        out_buy_prices << buy.first << ",";
    }
    out_buy_prices << std::endl;

    out_buy_prices.close();

    std::ofstream out_buy_sizes("output_buy_sizes.txt");

    // Write bid sizes to the file on the next line
    for (const auto& buy : sorted_buys) {
        out_buy_sizes << buy.second << ",";
    }
    out_buy_sizes << std::endl;

    out_buy_sizes.close();

    // Sort the Sell by price in ascending order (reverse=True)
    std::vector<std::pair<float, float>> sorted_sells(sell_tree.order_tree.begin(), sell_tree.order_tree.end());
    std::sort(sorted_sells.begin(), sorted_sells.end(), [](const auto& b1, const auto& b2) {
        return b1.first < b2.first;
        });

    // Calculate the cumulative size for bids
    for (size_t i = 1; i < sorted_sells.size(); ++i) {
        sorted_sells[i].second += sorted_sells[i - 1].second;
    }

    std::ofstream out_sell_prices("output_sell_prices.txt");

    // Write bid prices to the file on one line
    for (const auto& sell : sorted_sells) {
        out_sell_prices << sell.first << ",";
    }
    out_sell_prices << std::endl;

    out_sell_prices.close();

    std::ofstream out_sell_sizes("output_sell_sizes.txt");

    // Write bid sizes to the file on the next line
    for (const auto& sell : sorted_sells) {
        out_sell_sizes << sell.second << ",";
    }
    out_sell_sizes << std::endl;

    out_sell_sizes.close();
}
