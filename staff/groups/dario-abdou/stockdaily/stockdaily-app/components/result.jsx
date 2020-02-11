function Result({ details: {symbol, name, stock_exchange_short, change_pct, invested}, onToDetails }) {
    return <li onClick={() => onToDetails(symbol)}>
            <p>{symbol}</p>
            <p>({name})</p>
            {invested && <i className="fas fa-hand-holding-usd"></i>}
            <p>{stock_exchange_short}</p>
            {parseFloat(change_pct) > 0 && <p><i className="fas fa-sort-up"></i>+{change_pct}%</p>}
            {parseFloat(change_pct) < 0 && <p><i className="fas fa-sort-down"></i>{change_pct}%</p>}
        </li>
}