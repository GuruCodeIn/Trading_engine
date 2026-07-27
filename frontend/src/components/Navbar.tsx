import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="sidebar-nav">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive
                        ? "nav-item active"
                        : "nav-item"
                }
            >
                <span className="nav-icon">
                    📊
                </span>

                <span>
                    Dashboard
                </span>
            </NavLink>

            <NavLink
                to="/order-book"
                className={({ isActive }) =>
                    isActive
                        ? "nav-item active"
                        : "nav-item"
                }
            >
                <span className="nav-icon">
                    📖
                </span>

                <span>
                    Order Book
                </span>
            </NavLink>

            <NavLink
                to="/place-order"
                className={({ isActive }) =>
                    isActive
                        ? "nav-item active"
                        : "nav-item"
                }
            >
                <span className="nav-icon">
                    💹
                </span>

                <span>
                    Place Order
                </span>
            </NavLink>

            <NavLink
                to="/trade-history"
                className={({ isActive }) =>
                    isActive
                        ? "nav-item active"
                        : "nav-item"
                }
            >
                <span className="nav-icon">
                    📜
                </span>

                <span>
                    Trade History
                </span>
            </NavLink>
        </nav>
    );
}

export default Navbar;