import { API_BASE_URL } from "./api";

export type PlaceOrderRequest = {
    symbol: string;
    price: number;
    quantity: number;
    side: "BUY" | "SELL";
    orderType: "LIMIT" | "MARKET";
};

export async function placeOrder(
    order: PlaceOrderRequest
) {
    const response = await fetch(
        `${API_BASE_URL}/order`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify(order),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to submit order."
        );
    }

    return await response.json();
}