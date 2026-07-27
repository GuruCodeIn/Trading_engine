import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

type MarketOverviewChartProps = {
    prices: number[];
};

function MarketOverviewChart({
    prices,
}: MarketOverviewChartProps) {

    const chartOptions: ApexOptions = {
        chart: {
            type: "area",
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
            background: "transparent",
        },

        theme: {
            mode: "dark",
        },

        stroke: {
            curve: "smooth",
            width: 3,
        },

        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.45,
                opacityTo: 0.05,
            },
        },

        grid: {
            borderColor: "#334155",
        },

        colors: ["#3B82F6"],

        dataLabels: {
            enabled: false,
        },

        xaxis: {
            categories: prices.map(
                (_, index) => `#${index + 1}`
            ),
            labels: {
                style: {
                    colors: "#94A3B8",
                },
            },
        },

        yaxis: {
            labels: {
                style: {
                    colors: "#94A3B8",
                },
            },
        },

        tooltip: {
            theme: "dark",
        },
    };

    const chartSeries = [
        {
            name: "Order Price",
            data: prices,
        },
    ];

    return (
        <Chart
            options={chartOptions}
            series={chartSeries}
            type="area"
            height={320}
        />
    );
}

export default MarketOverviewChart;