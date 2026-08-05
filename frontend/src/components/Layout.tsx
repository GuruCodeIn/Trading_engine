import { ReactNode, useEffect, useState } from "react";

import Navbar from "./Navbar";

type LayoutProps = {
    children: ReactNode;
};

function Layout({ children }: LayoutProps) {
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        function updateTime() {
            const now = new Date();

            setCurrentTime(
                now.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                })
            );
        }

        updateTime();

        const timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="app-layout">
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <h2>Trading Engine</h2>

                    <p>Professional Trading Platform</p>
                </div>

                <Navbar />
            </aside>

            <div className="main-section">
                <header className="topbar">
                    <div className="topbar-left">
                        <h1>Trading Dashboard</h1>
                    </div>

                    <div className="topbar-right">
                        <div className="live-status">
                            <span className="live-dot"></span>

                            LIVE
                        </div>

                        <div className="clock">
                            {currentTime}
                        </div>

                        <div className="user-avatar">
                            GP
                        </div>
                    </div>
                </header>

                <main className="content">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;