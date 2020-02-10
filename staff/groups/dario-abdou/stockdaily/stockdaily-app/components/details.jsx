function Details({ details: {symbol, name, currency, price, price_open, close_yesterday, day_high, day_low, day_change, change_pct, stock_exchange_long, last_trade_time, gmt_offset }, onPositionSubmit }) {
    return <section>
        <h3>{name}</h3>
        <p>{change_pct}%</p>
        <p>{last_trade_time}</p>
        <p>Price: {price}</p>
        <p>Open: {price_open}</p>
        <p>High: {day_high}</p>
        <p>Low: {day_low}</p>
        <p>Close Yesterday: {close_yesterday}</p>
        <p>Info</p>
        <p>Symbol: {symbol}</p>
        <p>Market: {stock_exchange_long}</p>
        <p>Currency: {currency}</p>
        <p>Timezone: GMT{(parseInt(gmt_offset) / 60) / 60}</p>
        <form onSubmit={event => {
            event.preventDefault()

            const position = {
                amount: event.target.amount.value,
                date: event.target.date.value,
                symbol: symbol
            }

            onPositionSubmit(position)
        }}>
            <input type="date" name="date" />
            <input type="number" name="amount" />
            <button type="submit">Submit</button>
        </form>
    </section>
}