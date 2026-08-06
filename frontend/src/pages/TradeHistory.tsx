import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import {
    getAllOrders,
    cancelOrder,
    type TradeOrder,
} from "../services/tradeHistoryService";

import {
    connectWebSocket,
    subscribeWebSocket,
} from "../services/webSocketService";

function TradeHistory() {
    const [orders, setOrders] = useState<TradeOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    async function loadOrders() {
        try {
            const data = await getAllOrders();
            setOrders(data);
        } catch {
            setError("Failed to load trade history.");
        } finally {
            setLoading(false);
        }
    }

    async function handleCancelOrder(
    order: TradeOrder
) {
    try {

        await cancelOrder(
            order.symbol,
            order.id
        );

        setOrders((previousOrders) =>
            previousOrders.filter(
                (currentOrder) =>
                    currentOrder.id !==
                    order.id
            )
        );

    } catch {

        alert(
            "Failed to cancel order."
        );

    }
}

    useEffect(() => {
        loadOrders();

        connectWebSocket();

       const unsubscribe = subscribeWebSocket((message) => {

    if (message.event === "order_created") {

        setOrders((previousOrders) => [

            {
                id: message.order.id,
                symbol: message.order.symbol,
                side: message.order.type,
                price: message.order.price,
                quantity: message.order.quantity,
            },

            ...previousOrders,

        ]);

    }

    if (message.event === "order_cancelled") {

        setOrders((previousOrders) =>
            previousOrders.filter(
                (order) =>
                    order.id !==
                    message.orderId
            )
        );

    }

});

        return () => {
            unsubscribe();
        };
    }, []);

    const filteredOrders = [...orders]
        .filter((order) =>
            order.symbol
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => b.id - a.id);

    return (
        <Layout>
            <div className="section-header">
                <div>
                    <h2>Trade History • Live</h2>
                    <p>
                        Live stream of orders received
                        from the trading engine.
                    </p>
                </div>

                <h3>
                    {filteredOrders.length.toLocaleString()}{" "}
                    {filteredOrders.length === 1
                        ? "Order"
                        : "Orders"}
                </h3>
            </div>

            {loading && (
                <div className="dashboard-card">
                    <p>Loading trade history...</p>
                </div>
            )}

            {error && (
                <div className="dashboard-card">
                    <p
                        style={{
                            color: "#ef4444",
                            fontWeight: 600,
                        }}
                    >
                        {error}
                    </p>
                </div>
            )}

            {!loading && !error && (
                <>
                    <div
                        style={{
                            marginBottom: "20px",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Search by symbol..."
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(
                                    event.target.value
                                )
                            }
                            style={{
                                width: "100%",
                                padding: "10px 14px",
                                borderRadius: "8px",
                                border:
                                    "1px solid var(--border)",
                                background:
                                    "var(--surface)",
                                color: "var(--text)",
                                fontSize: "15px",
                            }}
                        />
                    </div>

                    <div className="dashboard-card">
                        <table>
                            <thead>
                                <tr>
                                    <th
                                        style={{
                                            width: "80px",
                                        }}
                                    >
                                        ID
                                    </th>
                                    <th>Symbol</th>
                                    <th>Side</th>
                                    <th
                                        style={{
                                            textAlign:
                                                "right",
                                        }}
                                    >
                                        Price
                                    </th>
                                    <th
    style={{
        textAlign: "right",
    }}
>
    Quantity
</th>

<th
    style={{
        textAlign: "center",
        width: "120px",
    }}
>
    Action
</th>
                                </tr>
                            </thead>

                            <tbody>
                                                                {filteredOrders.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            style={{
                                                textAlign: "center",
                                                padding: "30px",
                                                color: "var(--muted)",
                                            }}
                                        >
                                            No matching orders found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td>
                                                {order.id}
                                            </td>

                                            <td>
                                                {order.symbol}
                                            </td>

                                            <td
                                                style={{
                                                    color:
                                                        order.side ===
                                                        "BUY"
                                                            ? "#22c55e"
                                                            : "#ef4444",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {order.side}
                                            </td>

                                            <td
                                                style={{
                                                    textAlign: "right",
                                                }}
                                            >
                                                ₹{" "}
                                                {order.price.toFixed(
                                                    2
                                                )}
                                            </td>

                                            <td
    style={{
        textAlign: "right",
    }}
>
    {order.quantity.toLocaleString()}
</td>

<td
    style={{
        textAlign: "center",
    }}
>
    <button
        className="secondary-btn"
        onClick={() =>
            handleCancelOrder(order)
        }
    >
        Cancel
    </button>
</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </Layout>
    );
}

export default TradeHistory;