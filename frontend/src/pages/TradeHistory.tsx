import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import {
    getAllOrders,
    type TradeOrder,
} from "../services/tradeHistoryService";

import {
    connectWebSocket,
    disconnectWebSocket,
} from "../services/webSocketService";

function TradeHistory() {
    const [orders, setOrders] = useState<TradeOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
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

        loadOrders();

        connectWebSocket((message) => {
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
        });

        return () => {
            disconnectWebSocket();
        };
    }, []);

    return (
        <Layout>
            <h2>Trade History</h2>

            {loading && <p>Loading...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && (
                <table
                    border={1}
                    cellPadding={8}
                    style={{
                        margin: "20px auto",
                        borderCollapse: "collapse",
                    }}
                >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Symbol</th>
                            <th>Side</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.symbol}</td>
                                <td>{order.side}</td>
                                <td>{order.price}</td>
                                <td>{order.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Layout>
    );
}

export default TradeHistory;