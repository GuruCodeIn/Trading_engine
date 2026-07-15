#include "../include/TradingEngine/transactions.h"

/* Total stored order records */
size_t Transactions::getLength() const
{
	return raw_orders.size();
}

/* Total executed trades */
size_t Transactions::getNumberOfExecutedOrders() const
{
	return getLength() / 2;
}

void Transactions::addOrder(const std::string &raw_order)
{
	raw_orders.emplace_back(raw_order);
}