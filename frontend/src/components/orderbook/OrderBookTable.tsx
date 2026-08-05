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

    return (

        <div
            className={`orderbook-card ${
                side === "BUY"
                    ? "buy-book"
                    : "sell-book"
            }`}
        >

            <div className="orderbook-card-header">

                <h3>
                    {title}
                </h3>

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

                    No Orders

                </div>

            ) : (

                orders.map(
                    (
                        order,
                        index
                    ) => (

                        <div
                            key={index}
                            className="orderbook-row"
                        >

                            <div
                                className="depth-bar"
                                style={{
                                    width:
                                        `${
                                            (
                                                order.orderCount /
                                                maxOrders
                                            ) *
                                            100
                                        }%`,
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
                                $
                                {order.price.toFixed(
                                    2
                                )}
                            </span>

                            <strong>
                                {
                                    order.orderCount
                                }
                            </strong>

                        </div>

                    )
                )

            )}

        </div>

    );

}

export default OrderBookTable;