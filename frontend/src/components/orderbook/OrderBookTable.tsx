type PriceLevel = {
    price: number;
    orderCount: number;
};

type OrderBookTableProps = {
    title: string;
    side: "BUY" | "SELL";
    orders: PriceLevel[];
};

function OrderBookTable({
    title,
    side,
    orders,
}: OrderBookTableProps) {

    const maxOrders =
        orders.length === 0
            ? 1
            : Math.max(
                  ...orders.map(
                      (order) =>
                          order.orderCount
                  )
              );

    const totalOrders =
        orders.reduce(
            (sum, order) =>
                sum + order.orderCount,
            0
        );

    return (

        <div
            className={`orderbook-card ${
                side === "BUY"
                    ? "buy-book"
                    : "sell-book"
            }`}
        >

            <div className="orderbook-card-header">

                <div>

                    <h3>
                        {title}
                    </h3>

                    <small>
                        {totalOrders.toLocaleString()}{" "}
                        Orders
                    </small>

                </div>

                <span
                    className={
                        side === "BUY"
                            ? "buy-badge"
                            : "sell-badge"
                    }
                >
                    {side}
                </span>

            </div>

            <div className="orderbook-table-header">

                <span>
                    Price
                </span>

                <span>
                    Orders
                </span>

            </div>

            {orders.length === 0 ? (

                <div className="empty-book">

                    No Orders Available

                </div>

            ) : (

                orders.map(
                    (
                        order,
                        index
                    ) => (

                        <div
                            key={`${order.price}-${index}`}
                            className="orderbook-row"
                        >

                            <div
                                className="depth-bar"
                                style={{
                                    width: `${
                                        (
                                            order.orderCount /
                                            maxOrders
                                        ) * 100
                                    }%`,
                                    opacity:
                                        0.15 +
                                        (
                                            order.orderCount /
                                            maxOrders
                                        ) *
                                            0.55,
                                }}
                            />

                            <span
                                className={
                                    side ===
                                    "BUY"
                                        ? "buy-price"
                                        : "sell-price"
                                }
                            >
                                ₹{" "}
                                {order.price.toFixed(
                                    2
                                )}
                            </span>

                            <strong>
                                {order.orderCount.toLocaleString()}
                            </strong>

                        </div>

                    )
                )

            )}

        </div>

    );

}

export default OrderBookTable;