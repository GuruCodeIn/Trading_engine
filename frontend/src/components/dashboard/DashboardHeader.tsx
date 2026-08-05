import { useEffect, useState } from "react";
import {
    Activity,
    Clock3,
    Wifi,
    WifiOff,
    RefreshCw,
} from "lucide-react";

import {
    subscribeConnectionStatus,
} from "../../services/webSocketService";

function DashboardHeader() {

    const [currentTime, setCurrentTime] =
        useState(new Date());

    const [connectionStatus, setConnectionStatus] =
        useState("CONNECTING");

    useEffect(() => {

        const timer =
            setInterval(() => {

                setCurrentTime(
                    new Date()
                );

            }, 1000);

        const unsubscribe =
            subscribeConnectionStatus(
                (status) => {

                    setConnectionStatus(
                        status
                    );

                }
            );

        return () => {

            clearInterval(timer);

            unsubscribe();

        };

    }, []);

    const date =
        currentTime.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
            }
        );

    const time =
        currentTime.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }
        );

    function getStatusClass() {

        switch (connectionStatus) {

            case "CONNECTED":
                return "connected-status";

            case "RECONNECTING":
                return "reconnecting-status";

            case "DISCONNECTED":
                return "disconnected-status";

            default:
                return "connecting-status";

        }

    }

    function getStatusIcon() {

        switch (connectionStatus) {

            case "CONNECTED":
                return <Wifi size={16} />;

            case "RECONNECTING":
                return (
                    <RefreshCw
                        size={16}
                        className="spin-icon"
                    />
                );

            case "DISCONNECTED":
                return (
                    <WifiOff
                        size={16}
                    />
                );

            default:
                return (
                    <Activity
                        size={16}
                    />
                );

        }

    }

    return (

        <div className="dashboard-header-card">

            <div>

                <h1>
                    Trading Dashboard
                </h1>

                <p>
                    Monitor your trading engine
                    in real time.
                </p>

            </div>

            <div className="dashboard-status">

                <div
                    className={`status-pill ${getStatusClass()}`}
                >

                    {getStatusIcon()}

                    {connectionStatus}

                </div>

                <div className="dashboard-time">

                    <Clock3
                        size={18}
                    />

                    <div>

                        <strong>
                            {time}
                        </strong>

                        <small>
                            {date}
                        </small>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardHeader;