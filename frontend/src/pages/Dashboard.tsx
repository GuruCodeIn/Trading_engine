import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import { fetchOrders } from "../services/orderService";
import type { Order } from "../services/orderService";

import StatsCards from "../components/dashboard/StatsCards";
import RecentActivity from "../components/dashboard/RecentActivity";
import PortfolioSummary from "../components/dashboard/PortfolioSummary";
import MarketOverviewChart from "../components/MarketOverviewChart";
import DashboardHeader from "../components/dashboard/DashboardHeader";

import {
    connectWebSocket,
    subscribeWebSocket,
} from "../services/webSocketService";

function Dashboard() {

    const [orders, setOrders] =
        useState<Order[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadOrders();

        connectWebSocket();

        const unsubscribe =
            subscribeWebSocket(
                (message) => {

                    if (
                        message.event ===
                        "order_created"
                    ) {
                        loadOrders();
                    }

                }
            );

        return () => unsubscribe();

    }, []);

    async function loadOrders() {

        try {

            const data =
                await fetchOrders();

            setOrders(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    const totalOrders =
        orders.length;

    const buyOrders =
        orders.filter(
            (order) =>
                order.side === "BUY"
        ).length;

    const sellOrders =
        orders.filter(
            (order) =>
                order.side === "SELL"
        ).length;

    const totalVolume =
        orders.reduce(
            (sum, order) =>
                sum + order.quantity,
            0
        );

    const averagePrice =
        orders.length === 0
            ? "0.00"
            : (
                  orders.reduce(
                      (sum, order) =>
                          sum + order.price,
                      0
                  ) / orders.length
              ).toFixed(2);

    const uniqueSymbols =
        new Set(
            orders.map(
                (order) =>
                    order.symbol
            )
        ).size;

    const largestOrder =
        orders.length === 0
            ? 0
            : Math.max(
                  ...orders.map(
                      (order) =>
                          order.quantity
                  )
              );

    const orderPrices =
        orders.map(
            (order) =>
                order.price
        );

    return (

        <Layout>

            <div className="dashboard">

                <DashboardHeader />

                <StatsCards
                    loading={loading}
                    totalOrders={totalOrders}
                    buyOrders={buyOrders}
                    sellOrders={sellOrders}
                />

                <div className="dashboard-card market-card">

                    <h3>
                        Market Overview
                    </h3>

                    {loading ? (

                        <div className="chart-placeholder">
                            <p>
                                Loading chart...
                            </p>
                        </div>

                    ) : orderPrices.length === 0 ? (

                        <div className="chart-placeholder">
                            <p>
                                No market data available.
                            </p>
                        </div>

                    ) : (

                        <MarketOverviewChart
                            prices={orderPrices}
                        />

                    )}

                </div>

                <div className="dashboard-bottom">

                    <RecentActivity
                        loading={loading}
                        orders={orders}
                    />

                    <PortfolioSummary
                        totalVolume={totalVolume}
                        uniqueSymbols={uniqueSymbols}
                        averagePrice={averagePrice}
                        largestOrder={largestOrder}
                    />

                </div>

            </div>

        </Layout>

    );

}

export default Dashboard;