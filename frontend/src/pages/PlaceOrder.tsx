import { useState } from "react";

import Layout from "../components/Layout";
import { placeOrder } from "../services/orderService";
import type { PlaceOrderRequest } from "../services/orderService";

function PlaceOrder() {
    const [symbol, setSymbol] = useState("");

    const [price, setPrice] = useState("");

    const [quantity, setQuantity] = useState("");

    const [side, setSide] =
        useState<"BUY" | "SELL">("BUY");

    const [orderType, setOrderType] =
        useState<"LIMIT" | "MARKET">("LIMIT");

    const [message, setMessage] = useState("");

    async function handlePlaceOrder() {
        setMessage("");

        try {
            const order: PlaceOrderRequest = {
                symbol,
                price: Number(price),
                quantity: Number(quantity),
                side,
                orderType,
            };

            const response = await placeOrder(order);

            console.log(response);

            setMessage(
                "Order submitted successfully."
            );
        } catch (error) {
            console.error(error);

            setMessage(
                "Failed to submit order."
            );
        }
    }

    return (
        <Layout>
            <h2>Place Order</h2>

            <div>
                <label htmlFor="symbol">
                    Symbol:
                </label>

                <br />

                <input
                    id="symbol"
                    type="text"
                    value={symbol}
                    onChange={(event) =>
                        setSymbol(
                            event.target.value.toUpperCase()
                        )
                    }
                />
            </div>

            <br />

            <div>
                <label htmlFor="price">
                    Price:
                </label>

                <br />

                <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(event) =>
                        setPrice(event.target.value)
                    }
                />
            </div>

            <br />

            <div>
                <label htmlFor="quantity">
                    Quantity:
                </label>

                <br />

                <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(event) =>
                        setQuantity(
                            event.target.value
                        )
                    }
                />
            </div>

            <br />

            <div>
                <label htmlFor="side">
                    Side:
                </label>

                <br />

                <select
                    id="side"
                    value={side}
                    onChange={(event) =>
                        setSide(
                            event.target.value as
                                | "BUY"
                                | "SELL"
                        )
                    }
                >
                    <option value="BUY">
                        BUY
                    </option>

                    <option value="SELL">
                        SELL
                    </option>
                </select>
            </div>

            <br />

            <div>
                <label htmlFor="orderType">
                    Order Type:
                </label>

                <br />

                <select
                    id="orderType"
                    value={orderType}
                    onChange={(event) =>
                        setOrderType(
                            event.target.value as
                                | "LIMIT"
                                | "MARKET"
                        )
                    }
                >
                    <option value="LIMIT">
                        LIMIT
                    </option>

                    <option value="MARKET">
                        MARKET
                    </option>
                </select>
            </div>

            <br />

            <button
                type="button"
                onClick={handlePlaceOrder}
            >
                Place Order
            </button>

            <br />
            <br />

            {message && <p>{message}</p>}
        </Layout>
    );
}

export default PlaceOrder;