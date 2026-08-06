import {
    Search,
    RefreshCw,
} from "lucide-react";

type OrderBookSearchProps = {
    symbol: string;
    loading: boolean;
    onSymbolChange: (
        value: string
    ) => void;
    onSearch: () => void;
};

function OrderBookSearch({
    symbol,
    loading,
    onSymbolChange,
    onSearch,
}: OrderBookSearchProps) {

    function handleKeyDown(
        event: React.KeyboardEvent<HTMLInputElement>
    ) {

        if (event.key === "Enter") {
            onSearch();
        }

    }

    return (

        <div className="orderbook-search">

            <div className="search-group">

                <label htmlFor="symbol">
                    Trading Symbol
                </label>

                <input
                    id="symbol"
                    type="text"
                    value={symbol}
                    placeholder="AAPL"
                    maxLength={10}
                    autoComplete="off"
                    spellCheck={false}
                    onKeyDown={handleKeyDown}
                    onChange={(event) =>
                        onSymbolChange(
                            event.target.value
                                .toUpperCase()
                                .trim()
                        )
                    }
                />

            </div>

            <button
                className="primary-btn"
                onClick={onSearch}
                disabled={loading}
            >

                {loading ? (
                    <>
                        <RefreshCw
                            size={18}
                            className="spin-icon"
                        />

                        Loading...
                    </>
                ) : (
                    <>
                        <Search
                            size={18}
                        />

                        Load Order Book
                    </>
                )}

            </button>

        </div>

    );

}

export default OrderBookSearch;