import {
    BookOpen,
    Wifi,
} from "lucide-react";

function OrderBookHeader() {

    return (

        <div className="dashboard-header-card">

            <div>

                <h1>
                    Order Book
                </h1>

                <p>
                    Live market depth and
                    price levels.
                </p>

            </div>

            <div className="status-pill connected-status">

                <Wifi size={16}/>

                CONNECTED

            </div>

        </div>

    );

}

export default OrderBookHeader;