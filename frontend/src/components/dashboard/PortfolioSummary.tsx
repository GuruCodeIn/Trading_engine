import { useNavigate } from "react-router-dom";
import {
    Wallet,
    Boxes,
    DollarSign,
    Trophy,
    Plus,
    BookOpen,
    History,
} from "lucide-react";

type PortfolioSummaryProps = {
    totalVolume: number;
    uniqueSymbols: number;
    averagePrice: string;
    largestOrder: number;
};

function PortfolioSummary({
    totalVolume,
    uniqueSymbols,
    averagePrice,
    largestOrder,
}: PortfolioSummaryProps) {

    const navigate = useNavigate();

    return (

        <div className="dashboard-card quick-card">

            <div className="section-header">

                <h3>
                    Portfolio Summary
                </h3>

                <Wallet
                    size={22}
                    className="section-icon"
                />

            </div>

            <div className="summary-grid">

                <div className="summary-box">

                    <Boxes
                        size={18}
                        className="summary-icon"
                    />

                    <div>

                        <small>
                            Total Volume
                        </small>

                        <strong>
                            {totalVolume}
                        </strong>

                    </div>

                </div>

                <div className="summary-box">

                    <BookOpen
                        size={18}
                        className="summary-icon"
                    />

                    <div>

                        <small>
                            Symbols
                        </small>

                        <strong>
                            {uniqueSymbols}
                        </strong>

                    </div>

                </div>

                <div className="summary-box">

                    <DollarSign
                        size={18}
                        className="summary-icon"
                    />

                    <div>

                        <small>
                            Average Price
                        </small>

                        <strong>
                            ${averagePrice}
                        </strong>

                    </div>

                </div>

                <div className="summary-box">

                    <Trophy
                        size={18}
                        className="summary-icon"
                    />

                    <div>

                        <small>
                            Largest Order
                        </small>

                        <strong>
                            {largestOrder}
                        </strong>

                    </div>

                </div>

            </div>

            <div className="action-buttons">

                <button
                    className="primary-btn"
                    onClick={() =>
                        navigate("/place-order")
                    }
                >

                    <Plus size={18} />

                    Place Order

                </button>

                <button
                    className="secondary-btn"
                    onClick={() =>
                        navigate("/order-book")
                    }
                >

                    <BookOpen size={18} />

                    Order Book

                </button>

                <button
                    className="secondary-btn"
                    onClick={() =>
                        navigate("/trade-history")
                    }
                >

                    <History size={18} />

                    Trade History

                </button>

            </div>

        </div>

    );

}

export default PortfolioSummary;