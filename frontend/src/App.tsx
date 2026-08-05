import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import OrderBook from "./pages/OrderBook";
import PlaceOrder from "./pages/PlaceOrder";
import TradeHistory from "./pages/TradeHistory";

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={<Dashboard />}
            />

            <Route
                path="/order-book"
                element={<OrderBook />}
            />

            <Route
                path="/place-order"
                element={<PlaceOrder />}
            />

            <Route
                path="/trade-history"
                element={<TradeHistory />}
            />
        </Routes>
    );
}

export default App;