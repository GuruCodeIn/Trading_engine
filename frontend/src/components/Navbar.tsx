import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Dashboard</Link>
                </li>

                <li>
                    <Link to="/order-book">Order Book</Link>
                </li>

                <li>
                    <Link to="/trade-history">Trade History</Link>
                </li>
            </ul>

            <hr />
        </nav>
    );
}

export default Navbar;