import {
    BookOpen,
    Wifi,
    Activity,
} from "lucide-react";

function OrderBookHeader() {

    const currentTime =
        new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

    return (

        <div className="dashboard-header-card">

            <div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "8px",
                    }}
                >

                    <BookOpen
                        size={32}
                    />

                    <div>

                        <h1
                            style={{
                                margin: 0,
                            }}
                        >
                            Order Book
                        </h1>

                        <p
                            style={{
                                margin: 0,
                            }}
                        >
                            Live market depth and
                            price levels
                        </p>

                    </div>

                </div>

            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                }}
            >

                <div className="status-pill connected-status">

                    <Wifi size={16} />

                    CONNECTED

                </div>

                <div className="status-pill">

                    <Activity
                        size={16}
                    />

                    {currentTime}

                </div>

            </div>

        </div>

    );

}

export default OrderBookHeader;