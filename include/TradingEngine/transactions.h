/*
Contains declaration for Transactions class responsible for storing executed orders.

Currently stores raw order strings.
TODO:
Store executed trades in JSON format for REST API and database persistence.
*/

#ifndef TRADING_ENGINE_SOURCE_HEADERS_TRANSACTIONS_H_
#define TRADING_ENGINE_SOURCE_HEADERS_TRANSACTIONS_H_

#pragma once

#include <cstddef>
#include <string>
#include <vector>

class Transactions
{
private:
	std::vector<std::string> raw_orders;

	// TODO:
	// Store executed trades in JSON format for REST API and database persistence.
	std::vector<std::string> json_orders;

public:
	Transactions() = default;

	/* Total stored order records */
	size_t getLength() const;

	/* Total executed trades */
	size_t getNumberOfExecutedOrders() const;

	void addOrder(const std::string &raw_order);
};

#endif // TRADING_ENGINE_SOURCE_HEADERS_TRANSACTIONS_H_