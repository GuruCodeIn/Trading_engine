import { useEffect, useState } from "react";
import {
    Activity,
    Clock3,
} from "lucide-react";

function DashboardHeader() {

    const [currentTime, setCurrentTime] =
        useState(new Date());

    useEffect(() => {

        const timer =
            setInterval(() => {

                setCurrentTime(
                    new Date()
                );

            }, 1000);

        return () =>
            clearInterval(timer);

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

                <div className="status-pill">

                    <Activity
                        size={16}
                    />

                    LIVE

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