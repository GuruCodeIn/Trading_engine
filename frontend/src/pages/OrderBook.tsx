import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { getOrderBook } from "../services/orderBookService";

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
                await getOrderBook(symbol);

            setOrderBook(data);
        } catch (error) {
            console.error(error);

            setOrderBook(null);

            setError(
                "Unable to load the order book. Please try again."
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

        return () => {
            unsubscribe();
        };
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
                        setSymbol(
                            event.target.value.toUpperCase()
                        )
                    }
                />

                <button
                    type="button"
                    onClick={
                        fetchOrderBook
                    }
                    disabled={loading}
                >
                    {loading
                        ? "Loading..."
                        : "Load Order Book"}
                </button>
            </div>

            <br />

            {loading && (
                <p>
                    Loading order
                    book...
                </p>
            )}

            {error && (
                <p>
                    <strong>
                        {error}
                    </strong>
                </p>
            )}

            {!loading &&
                !error &&
                orderBook && (
                    <>
                        <p>
                            <strong>
                                Symbol:
                            </strong>{" "}
                            {
                                orderBook.symbol
                            }
                        </p>

                        <div
                            style={{
                                display:
                                    "flex",
                                gap: "40px",
                                justifyContent:
                                    "center",
                                flexWrap:
                                    "wrap",
                            }}
                        >
                            <div>
                                <h3
                                    style={{
                                        color:
                                            "green",
                                    }}
                                >
                                    BUY
                                    ORDERS
                                </h3>

                                <table
                                    border={
                                        1
                                    }
                                    cellPadding={
                                        8
                                    }
                                    style={{
                                        borderCollapse:
                                            "collapse",
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            <th>
                                                Price
                                            </th>
                                            <th>
                                                Orders
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {orderBook.buyOrders.length ===
                                        0 ? (
                                            <tr>
                                                <td
                                                    colSpan={
                                                        2
                                                    }
                                                >
                                                    No
                                                    Buy
                                                    Orders
                                                </td>
                                            </tr>
                                        ) : (
                                            orderBook.buyOrders.map(
                                                (
                                                    order,
                                                    index
                                                ) => (
                                                    <tr
                                                        key={
                                                            index
                                                        }
                                                    >
                                                        <td>
                                                            {
                                                                order.price
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                order.orderCount
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                <h3
                                    style={{
                                        color:
                                            "red",
                                    }}
                                >
                                    SELL
                                    ORDERS
                                </h3>

                                <table
                                    border={
                                        1
                                    }
                                    cellPadding={
                                        8
                                    }
                                    style={{
                                        borderCollapse:
                                            "collapse",
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            <th>
                                                Price
                                            </th>
                                            <th>
                                                Orders
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {orderBook.sellOrders.length ===
                                        0 ? (
                                            <tr>
                                                <td
                                                    colSpan={
                                                        2
                                                    }
                                                >
                                                    No
                                                    Sell
                                                    Orders
                                                </td>
                                            </tr>
                                        ) : (
                                            orderBook.sellOrders.map(
                                                (
                                                    order,
                                                    index
                                                ) => (
                                                    <tr
                                                        key={
                                                            index
                                                        }
                                                    >
                                                        <td>
                                                            {
                                                                order.price
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                order.orderCount
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <br />

                        <h3>
                            Statistics
                        </h3>

                        <p>
                            <strong>
                                Total
                                Submitted:
                            </strong>{" "}
                            {
                                orderBook.totalOrdersSubmitted
                            }
                        </p>

                        <p>
                            <strong>
                                Total
                                Fulfilled:
                            </strong>{" "}
                            {
                                orderBook.totalOrdersFulfilled
                            }
                        </p>

                        <p>
                            <strong>
                                Total
                                Unfulfilled:
                            </strong>{" "}
                            {
                                orderBook.totalOrdersUnfulfilled
                            }
                        </p>
                    </>
                )}
        </Layout>
    );
}

export default OrderBook;