#include <cassert>
#include <iostream>

#include "../include/TradingEngine/order_book.h"

int main() {
    OrderBook book;

    Order buy("AAPL",1,OrderType::BUY,100.0f,10.0f);
    Order sell("AAPL",2,OrderType::SELL,100.0f,10.0f);

    book.processOrder(buy);
    assert(book.getTotalOrdersSubmitted()==1);
    assert(book.getTotalOrdersUnfulfilled()==1);

    book.processOrder(sell);

    assert(book.getTotalOrdersSubmitted()==2);
    assert(book.getTotalOrdersFulfilled()==2);
    assert(book.getTotalOrdersUnfulfilled()==0);

    std::cout<<"[PASS] Full Match Test\n";
    return 0;
}
