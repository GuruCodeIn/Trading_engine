import AnimatedCounter from "../common/AnimatedCounter";

import {
    Package,
    TrendingUp,
    TrendingDown,
    Cpu,
} from "lucide-react";

type StatsCardsProps = {
    loading: boolean;
    totalOrders: number;
    buyOrders: number;
    sellOrders: number;
};

function StatsCards({
    loading,
    totalOrders,
    buyOrders,
    sellOrders,
}: StatsCardsProps) {

    const buyPercentage =
        totalOrders === 0
            ? "0.0"
            : (
                  (buyOrders /
                      totalOrders) *
                  100
              ).toFixed(1);

    const sellPercentage =
        totalOrders === 0
            ? "0.0"
            : (
                  (sellOrders /
                      totalOrders) *
                  100
              ).toFixed(1);

    const lastUpdated =
        new Date().toLocaleTimeString();

    return (

        <div className="stats-grid">

            <div className="dashboard-card stat-card">

                <div className="stat-top">

                    <Package
                        size={30}
                        className="stat-icon"
                    />

                    <span className="stat-tag live-tag">
                        LIVE
                    </span>

                </div>

                <p className="stat-title">
                    Total Orders
                </p>

                <h1>

                    {loading
                        ? "--"
                        : (
                            <AnimatedCounter
                                value={
                                    totalOrders
                                }
                            />
                        )}

                </h1>

                <small>
                    Orders Processed
                </small>

            </div>

            <div className="dashboard-card stat-card">

                <div className="stat-top">

                    <TrendingUp
                        size={30}
                        className="buy-icon"
                    />

                    <span className="stat-tag buy-tag">
                        {buyPercentage}%
                    </span>

                </div>

                <p className="stat-title">
                    Buy Orders
                </p>

                <h1>

                    {loading
                        ? "--"
                        : (
                            <AnimatedCounter
                                value={
                                    buyOrders
                                }
                            />
                        )}

                </h1>

                <small>
                    Active BUY Orders
                </small>

            </div>

            <div className="dashboard-card stat-card">

                <div className="stat-top">

                    <TrendingDown
                        size={30}
                        className="sell-icon"
                    />

                    <span className="stat-tag sell-tag">
                        {sellPercentage}%
                    </span>

                </div>

                <p className="stat-title">
                    Sell Orders
                </p>

                <h1>

                    {loading
                        ? "--"
                        : (
                            <AnimatedCounter
                                value={
                                    sellOrders
                                }
                            />
                        )}

                </h1>

                <small>
                    Active SELL Orders
                </small>

            </div>

            <div className="dashboard-card stat-card">

                <div className="stat-top">

                    <Cpu
                        size={30}
                        className="engine-icon"
                    />

                    <span className="stat-tag connected-tag">
                        CONNECTED
                    </span>

                </div>

                <p className="stat-title">
                    Engine Status
                </p>

                <h1 className="engine-online">
                    ONLINE
                </h1>

                <small>
                    Updated {lastUpdated}
                </small>

            </div>

        </div>

    );

}

export default StatsCards;