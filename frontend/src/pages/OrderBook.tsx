import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { getOrderBook } from "../services/orderBookService";

type OrderBookResponse = {
    symbol: string;
    success: boolean;
    buyOrders: unknown[];
    sellOrders: unknown[];
    totalOrdersSubmitted: number;
    totalOrdersFulfilled: number;
    totalOrdersUnfulfilled: number;
};

function OrderBook() {
    const [symbol, setSymbol] = useState("AAPL");

    const [orderBook, setOrderBook] =
        useState<OrderBookResponse | null>(null);

    const [loading, setLoading] = useState(false);

    async function fetchOrderBook() {
        try {
            setLoading(true);

            const data = await getOrderBook(symbol);
            setOrderBook(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrderBook();
    }, []);

    return (
        <Layout>
            <h2>Order Book</h2>

            <div>
                <label htmlFor="symbol">
                    Symbol:
                </label>

                <input
                    id="symbol"
                    type="text"
                    value={symbol}
                    onChange={(event) =>
                        setSymbol(event.target.value.toUpperCase())
                    }
                />

                <button
                    onClick={fetchOrderBook}
                    disabled={loading}
                >
                    {loading
                        ? "Loading..."
                        : "Load Order Book"}
                </button>
            </div>

            <br />

            {orderBook && (
                <div>
                    <p>
                        <strong>Symbol:</strong>{" "}
                        {orderBook.symbol}
                    </p>

                    <p>
                        <strong>Buy Orders:</strong>{" "}
                        {orderBook.buyOrders.length}
                    </p>

                    <p>
                        <strong>Sell Orders:</strong>{" "}
                        {orderBook.sellOrders.length}
                    </p>

                    {orderBook.buyOrders.length === 0 &&
                        orderBook.sellOrders.length === 0 && (
                            <p>
                                No orders available for this symbol.
                            </p>
                        )}

                    <p>
                        <strong>Total Submitted:</strong>{" "}
                        {orderBook.totalOrdersSubmitted}
                    </p>

                    <p>
                        <strong>Total Fulfilled:</strong>{" "}
                        {orderBook.totalOrdersFulfilled}
                    </p>

                    <p>
                        <strong>Total Unfulfilled:</strong>{" "}
                        {orderBook.totalOrdersUnfulfilled}
                    </p>
                </div>
            )}
        </Layout>
    );
}

export default OrderBook;