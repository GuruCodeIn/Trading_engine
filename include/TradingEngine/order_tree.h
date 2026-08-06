/*
Contains declaration for composition class responsible for managing objects of LimitOrder class
through a balanced binary search tree (red-black tree). The Tree will be sorted based on Price only,
other factors like event time are not considered. The class also contains data structures for efficient
access to LimitOrder and Order objects.
*/

#ifndef TRADING_ENGINE_SOURCE_HEADERS_ORDER_TREE_H_
#define TRADING_ENGINE_SOURCE_HEADERS_ORDER_TREE_H_

#pragma once
#include <map>
#include <unordered_map>
#include <memory>
#include <unordered_set>
#include <sstream>

#include "transactions.h"
#include "order_type.h"
#include "order_status.h"
#include "order.h"
#include "limit_order.h"

class OrderTree
{
public:
	std::map<float, int> order_tree;

	std::unordered_set<unsigned int> order_set;

	std::unordered_map<float, LimitOrder> price_map;

	// NEW: Fast lookup of orders by ID
	std::unordered_map<
		unsigned int,
		std::shared_ptr<Order>>
		order_lookup;

	float min_price;
	float max_price;
	OrderType type;

public:
	OrderTree(OrderType tree_type)
		: order_tree({}),
		  order_set({}),
		  price_map({}),
		  order_lookup({}),
		  min_price(std::numeric_limits<float>::quiet_NaN()),
		  max_price(std::numeric_limits<float>::quiet_NaN()),
		  type(tree_type) {}

	size_t getLength() const;

	const std::map<float, int> &getPriceLevels() const;
	const std::unordered_map<float, LimitOrder> &getPriceMap() const;

	const float &getMinPrice();
	void setMinPrice(const float &new_min);

	const float &getMaxPrice();
	void setMaxPrice(const float &new_max);

	const OrderType &getType() const;

	void addPriceOrder(Order &incoming_order);

	void deletePriceOrder(const std::shared_ptr<Order> &order_to_delete);

	void deleteLimitPrice(const float &limit_price);

	void matchPriceOrder(
		Order &incoming_order,
		std::ostringstream &store_transaction);
};

#endif // !TRADING_ENGINE_SOURCE_HEADERS_ORDER_TREE_H_
