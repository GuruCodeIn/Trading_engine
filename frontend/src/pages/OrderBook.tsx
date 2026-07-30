import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import OrderBookHeader from "../components/orderbook/OrderBookHeader";
import OrderBookSearch from "../components/orderbook/OrderBookSearch";

import { getOrderBook } from "../services/orderBookService";

import OrderBookTable from "../components/orderbook/OrderBookTable";

import OrderBookStatistics from "../components/orderbook/OrderBookStatistics";

import {
    connectWebSocket,
    subscribeWebSocket,
} from "../services/webSocketService";

type PriceLevel = {
    price: number;
    orderCount: number;
};

type OrderBookResponse = {
    symbol: string;
    success: boolean;
    buyOrders: PriceLevel[];
    sellOrders: PriceLevel[];
    totalOrdersSubmitted: number;
    totalOrdersFulfilled: number;
    totalOrdersUnfulfilled: number;
};

function OrderBook() {

    const [symbol, setSymbol] =
        useState("AAPL");

    const [orderBook, setOrderBook] =
        useState<OrderBookResponse | null>(
            null
        );

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    async function fetchOrderBook() {

        setLoading(true);

        setError("");

        try {

            const data =
                await getOrderBook(
                    symbol
                );

            setOrderBook(data);

        } catch (error) {

            console.error(error);

            setOrderBook(null);

            setError(
                "Unable to load the order book."
            );

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        fetchOrderBook();

        connectWebSocket();

        const unsubscribe =
            subscribeWebSocket(
                (message) => {

                    if (
                        message.event ===
                        "order_created"
                    ) {

                        fetchOrderBook();

                    }

                }
            );

        return () =>
            unsubscribe();

    }, []);

    return (

        <Layout>

            <OrderBookHeader />

            <OrderBookSearch
                symbol={symbol}
                loading={loading}
                onSymbolChange={
                    setSymbol
                }
                onSearch={
                    fetchOrderBook
                }
            />

            {loading && (
                <p>
                    Loading order book...
                </p>
            )}

            {error && (
                <p>
                    {error}
                </p>
            )}

            {!loading &&
    !error &&
    orderBook && (

        <>
    <OrderBookStatistics
        totalSubmitted={
            orderBook.totalOrdersSubmitted
        }
        totalFulfilled={
            orderBook.totalOrdersFulfilled
        }
        totalUnfulfilled={
            orderBook.totalOrdersUnfulfilled
        }
    />

    <div className="orderbook-grid">

        <OrderBookTable
            title="Buy Orders"
            side="BUY"
            orders={
                orderBook.buyOrders
            }
        />

        <OrderBookTable
            title="Sell Orders"
            side="SELL"
            orders={
                orderBook.sellOrders
            }
        />

    </div>

</>

)}

        </Layout>

    );

}

export default OrderBook;