import { API_BASE_URL } from "./api";

export interface TradeOrder {
    id: number;
    symbol: string;
    side: "BUY" | "SELL";
    price: number;
    quantity: number;
}

export async function getAllOrders(): Promise<TradeOrder[]> {
    const response = await fetch(
        `${API_BASE_URL}/orders`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch orders."
        );
    }

    const data = await response.json();

    return data.orders;
}

export async function cancelOrder(
    symbol: string,
    orderId: number
) {
    const response = await fetch(
        `${API_BASE_URL}/order/${symbol}/${orderId}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to cancel order."
        );
    }

    return await response.json();
}