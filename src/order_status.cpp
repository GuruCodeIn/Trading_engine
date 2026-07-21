#include "../include/TradingEngine/order_status.h"

#include <unordered_map>
using std::unordered_map;

#include <string>
using std::string;

unordered_map<OrderStatus, string> order_status_map = {
	{OrderStatus::NEW_ORDER, "NEW ORDER"},
	{OrderStatus::PARTIALLY_FILLED, "PARTIALLY FILLED"},
	{OrderStatus::FULFILLED, "FULFILLED"},
	{OrderStatus::STORED, "STORED"}};

std::string orderStatusToString(const OrderStatus &status)
{
	switch (status)
	{
	case OrderStatus::NEW_ORDER:
		return "NEW_ORDER";

	case OrderStatus::PARTIALLY_FILLED:
		return "PARTIALLY_FILLED";

	case OrderStatus::FULFILLED:
		return "FULFILLED";

	case OrderStatus::STORED:
		return "STORED";

	default:
		return "UNKNOWN";
	}
}