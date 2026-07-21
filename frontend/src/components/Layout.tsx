import { ReactNode } from "react";

import Navbar from "./Navbar";

type LayoutProps = {
    children: ReactNode;
};

function Layout({ children }: LayoutProps) {
    return (
        <div>
            <header>
                <h1>Trading Engine</h1>
                <hr />
            </header>

            <Navbar />

            <main>
                {children}
            </main>
        </div>
    );
}

export default Layout;