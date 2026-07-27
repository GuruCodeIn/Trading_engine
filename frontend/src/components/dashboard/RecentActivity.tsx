import type { Order } from "../../services/orderService";
import {
    ArrowUpRight,
    ArrowDownRight,
    Clock3,
} from "lucide-react";

type RecentActivityProps = {
    loading: boolean;
    orders: Order[];
};

function RecentActivity({
    loading,
    orders,
}: RecentActivityProps) {

    return (

        <div className="dashboard-card activity-card">

            <div className="section-header">

                <h3>
                    Recent Activity
                </h3>

                <Clock3
                    size={20}
                    className="section-icon"
                />

            </div>

            {loading ? (

                <p>
                    Loading...
                </p>

            ) : orders.length === 0 ? (

                <p>
                    No recent activity.
                </p>

            ) : (

                <div className="activity-list">

                    {orders
                        .slice(0, 5)
                        .map((order) => (

                            <div
                                key={order.id}
                                className="activity-item"
                            >

                                <div className="activity-left">

                                    <div
                                        className={
                                            order.side === "BUY"
                                                ? "activity-icon buy-bg"
                                                : "activity-icon sell-bg"
                                        }
                                    >

                                        {order.side === "BUY" ? (

                                            <ArrowUpRight
                                                size={18}
                                            />

                                        ) : (

                                            <ArrowDownRight
                                                size={18}
                                            />

                                        )}

                                    </div>

                                    <div>

                                        <strong>
                                            {order.symbol}
                                        </strong>

                                        <div className="activity-subtitle">

                                            Qty: {order.quantity}

                                        </div>

                                    </div>

                                </div>

                                <div className="activity-right">

                                    <div
                                        className={
                                            order.side === "BUY"
                                                ? "buy-text"
                                                : "sell-text"
                                        }
                                    >

                                        {order.side}

                                    </div>

                                    <strong>

                                        ${order.price}

                                    </strong>

                                </div>

                            </div>

                        ))}

                </div>

            )}

        </div>

    );

}

export default RecentActivity;