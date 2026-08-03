#include "../include/TradingEngine/limit_order.h"

#include <memory>
#include <sstream>
#include <unordered_set>

using std::shared_ptr;
using std::ostringstream;
using std::unordered_set;

const shared_ptr<Order>& LimitOrder::getHead() {
    return limit_order_head;
}

void LimitOrder::setHead(const shared_ptr<Order>& incoming_order) {
    limit_order_head = incoming_order;
}

const shared_ptr<Order>& LimitOrder::getTail() {
    return limit_order_tail;
}

void LimitOrder::setTail(const shared_ptr<Order>& incoming_order) {
    limit_order_tail = incoming_order;
}

int LimitOrder::getListLength() const {
    return limit_order_length;
}

float LimitOrder::getTotalQuantity() const {
    float totalQuantity = 0.0f;
    shared_ptr<Order> currentOrder = limit_order_head;

    while (currentOrder != nullptr) {
        totalQuantity += currentOrder->getPeakQuantity();
        currentOrder = currentOrder->next_order;
    }

    return totalQuantity;
}

int LimitOrder::updateListLength(const int& update_increment) {
    limit_order_length += update_increment;
    return limit_order_length;
}

void LimitOrder::addOrder(Order& incoming_order) {

    shared_ptr<Order> incoming_order_ptr =
        std::make_shared<Order>(incoming_order);

    limit_order_length++;

    incoming_order_ptr->next_order = nullptr;
    incoming_order_ptr->prev_order = nullptr;

    if (limit_order_head == nullptr) {
        limit_order_head = incoming_order_ptr;
        limit_order_tail = incoming_order_ptr;
        return;
    }

    incoming_order_ptr->prev_order = limit_order_tail;
    limit_order_tail->next_order = incoming_order_ptr;
    limit_order_tail = incoming_order_ptr;
}

void LimitOrder::deleteOrder(const shared_ptr<Order>& order_to_delete) {

    if (order_to_delete == nullptr || limit_order_length == 0) {
        return;
    }

    shared_ptr<Order> next_order = order_to_delete->next_order;
    shared_ptr<Order> prev_order = order_to_delete->prev_order;

    if (prev_order != nullptr) {
        prev_order->next_order = next_order;
    } else {
        limit_order_head = next_order;
    }

    if (next_order != nullptr) {
        next_order->prev_order = prev_order;
    } else {
        limit_order_tail = prev_order;
    }

    limit_order_length--;

    order_to_delete->next_order.reset();
    order_to_delete->prev_order.reset();

    if (limit_order_length == 0) {
        limit_order_head.reset();
        limit_order_tail.reset();
    }
}

void LimitOrder::matchOrder(
    Order& incoming_order,
    unordered_set<unsigned int>& order_set,
    ostringstream& executed_orders) {

    shared_ptr<Order> current = limit_order_head;

    while (incoming_order.getPeakQuantity() > 0 &&
           current != nullptr &&
           limit_order_length > 0) {

        bool fullyMatched = current->Match(incoming_order);

        if (!fullyMatched) {
            break;
        }

        shared_ptr<Order> next = current->next_order;

        current->storeOrderInfo(executed_orders, "\033[32m");
        order_set.erase(current->getID());
        deleteOrder(current);

        current.reset();
        current = next;
    }
}
