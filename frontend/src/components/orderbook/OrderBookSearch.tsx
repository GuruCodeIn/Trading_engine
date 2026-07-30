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
                    onChange={(event) =>
                        onSymbolChange(
                            event.target.value.toUpperCase()
                        )
                    }
                />

            </div>

            <button
                className="primary-btn"
                onClick={onSearch}
                disabled={loading}
            >

                {loading
                    ? "Loading..."
                    : "Load Order Book"}

            </button>

        </div>

    );

}

export default OrderBookSearch;