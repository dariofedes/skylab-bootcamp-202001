const { Component } = React

class Details extends Component {

    state = { detail: undefined, profit: undefined, newPositionForm: false }

    componentWillMount() {
        const { props: { symbol } } = this
        retrieveDetails(symbol, (error, details) => {
            if(error) {
                //TODO Handling Error
            } else {
                this.setState({ detail: details })

                const { token } = sessionStorage
                calculateProfit(symbol, token, (error, profit) => {
                    if(error) {
                        //TODO Handle Error
                    } else {
                        this.setState({ profit })
                    }
                })
            }
        })
    }

    handleOnToNewPosition = () => {
        this.setState({ newPositionForm: true })
    }

    handleOnNewPositionSubmit = position => {
        const { props: { symbol } } = this
        const { token } = sessionStorage

        setNewPosition(position, token, (error, success) => {
            if(error) {
                //TODO Handle Error
            } else {
                calculateProfit(symbol, token, (error, profit) => {
                    if(error) {
                        //TODO Handle Error
                    } else {
                        this.setState({ profit, newPositionForm: false })
                    }
                })
            }
        })
    }

    handleOnCancel = () => {
        this.setState({ newPositionForm: false })
    }

    render() {
        if(this.state.detail){

        const{ props: { symbol }, state: { detail: { name, change_pct, last_trade_time, price, price_open, day_high, day_low, close_yesterday, stock_exchange_long, currency, gmt_offset }, profit, newPositionForm }, handleOnNewPositionSubmit, handleOnToNewPosition, handleOnCancel } = this

        return <section> 
            <h3>{name}</h3>
            <p>{change_pct}%</p>
            {profit && <Profit profit={profit} />}
            {!profit && <p>You have no open positions on this stock.</p>}
            <button onClick={handleOnToNewPosition}>Add new position</button>
            {newPositionForm && <NewPositionForm onPositionSubmit={handleOnNewPositionSubmit} symbol={symbol} onCancel={handleOnCancel} />}
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
        </section>
        } else {
            return <p>Loading...</p>
        }
    }
}
