function Result({ details: {symbol, name, stock_exchange_short, change_pct, invested}, onToDetails }) {
    return <li className="result" onClick={() => onToDetails(symbol)}>
            <div className="result__company">
                <p className="result__company-symbol">{symbol}</p>
                <p className="result__company-detail">({name})</p>
                <p className="result__company-detail">{stock_exchange_short}</p>
            </div>
            {invested && <i className="fas fa-coins result__invested"></i>}
            {parseFloat(change_pct) > 0 && <p className="result__change result__change--up"><i className="fas fa-sort-up result__icon result__icon--up"></i> +{change_pct}%</p>}
            {parseFloat(change_pct) < 0 && <p className="result__change result__change--down"><i className="fas fa-sort-down result__icon result__icon--down"></i> {change_pct}%</p>}
            {change_pct == 0 && <p className="details__relative-change"><strong>=</strong></p>}
        </li>
}