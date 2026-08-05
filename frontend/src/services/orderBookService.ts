import { API_BASE_URL } from "./api";

export async function getOrderBook(symbol: string) {
    const response = await fetch(
        `${API_BASE_URL}/orderbook/${symbol}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch order book.");
    }

    return await response.json();
}