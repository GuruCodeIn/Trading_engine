import AnimatedCounter from "../common/AnimatedCounter";

import {
    Package,
    CheckCircle2,
    Clock3,
} from "lucide-react";

type OrderBookStatisticsProps = {
    totalSubmitted: number;
    totalFulfilled: number;
    totalUnfulfilled: number;
};

function OrderBookStatistics({
    totalSubmitted,
    totalFulfilled,
    totalUnfulfilled,
}: OrderBookStatisticsProps) {

    return (

        <div className="stats-grid">

            <div className="dashboard-card stat-card">

                <div className="stat-top">

                    <Package
                        size={28}
                        className="stat-icon"
                    />

                </div>

                <p className="stat-title">
                    Submitted Orders
                </p>

                <h1>

                    <AnimatedCounter
                        value={totalSubmitted}
                    />

                </h1>

            </div>

            <div className="dashboard-card stat-card">

                <div className="stat-top">

                    <CheckCircle2
                        size={28}
                        className="buy-icon"
                    />

                </div>

                <p className="stat-title">
                    Fulfilled
                </p>

                <h1>

                    <AnimatedCounter
                        value={totalFulfilled}
                    />

                </h1>

            </div>

            <div className="dashboard-card stat-card">

                <div className="stat-top">

                    <Clock3
                        size={28}
                        className="engine-icon"
                    />

                </div>

                <p className="stat-title">
                    Pending
                </p>

                <h1>

                    <AnimatedCounter
                        value={totalUnfulfilled}
                    />

                </h1>

            </div>

        </div>

    );

}

export default OrderBookStatistics;