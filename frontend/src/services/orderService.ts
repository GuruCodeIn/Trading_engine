import { API_BASE_URL } from "./api";

export type PlaceOrderRequest = {
    symbol: string;
    price: number;
    quantity: number;
    side: "BUY" | "SELL";
    orderType: "LIMIT" | "MARKET";
};

export type Order = {
    id: number;
    symbol: string;
    price: number;
    quantity: number;
    side: "BUY" | "SELL";
};

export async function placeOrder(
    order: PlaceOrderRequest
) {
    const response = await fetch(
        `${API_BASE_URL}/order`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to submit order.");
    }

    return await response.json();
}

export async function fetchOrders(): Promise<Order[]> {
    const response = await fetch(
        `${API_BASE_URL}/orders`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch orders."
        );
    }

    const data = await response.json();

    console.log("GET /orders Response:", data);

    return data.orders;
}