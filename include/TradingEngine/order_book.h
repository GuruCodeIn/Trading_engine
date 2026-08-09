/*
Contains declaration for composition class responsible for
managing Buy and Sell OrderTree objects. This is the main class
used to run Order simulations.
*/

#ifndef TRADING_ENGINE_SOURCE_HEADERS_ORDER_BOOK_H_
#define TRADING_ENGINE_SOURCE_HEADERS_ORDER_BOOK_H_

#include<string>
using std::string;

#include <sstream>
using std::ostringstream;

#include "transactions.h"
#include "order_type.h"
#include "order_status.h"
#include "order.h"
#include "limit_order.h"
#include "order_tree.h"
#include "trade_history.h"

class OrderBook {
private:
  OrderTree buy_tree;
  OrderTree sell_tree;
  ostringstream output_data;
  int total_orders_submitted;

public:
  OrderBook() : buy_tree(OrderType::BUY), sell_tree(OrderType::SELL), total_orders_submitted(0){};

  /* Getter functions */
  OrderTree& getBuyTree();
  OrderTree& getSellTree();
  const std::map<float, int> &getBuyPriceLevels() const;
  const std::map<float, int> &getSellPriceLevels() const;
  OrderTree& getOrderTreeByOrderType(const OrderType& order_type);

  int getTotalOrdersSubmitted() const;
  int getTotalOrdersFulfilled() const;
  int getTotalOrdersUnfulfilled() const;

  string getResults();

  /* Execute incoming_order or store if it's not completelty filled */
  void processOrder(
      Order &incoming_order,
      TradeHistory &tradeHistory);

  bool cancelOrder(unsigned int orderId);

  void getCurrentSnapshot();

};

#endif // !TRADING_ENGINE_SOURCE_HEADERS_ORDER_BOOK_H_
