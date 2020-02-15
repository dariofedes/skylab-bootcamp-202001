const { Component } = React

class Details extends Component {

    state = { detail: undefined, profit: undefined, newPositionForm: false, error: undefined }

    showFeedback = error =>{
        this.setState({ error: error.message })

        setTimeout(() => {
            this.setState({ error: undefined })
        }, 3000)
    }

    componentWillMount() {
        const { props: { symbol } } = this
        retrieveDetails(symbol, (error, details) => {
            if(error) {
                this.showFeedback(error)
            } else {
                this.setState({ detail: details })

                const { token } = sessionStorage
                calculateProfit(symbol, token, (error, profit) => {
                    if(error) {
                        this.showFeedback(error)
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
                this.showFeedback(error)
            } else {
                calculateProfit(symbol, token, (error, profit) => {
                    if(error) {
                        this.showFeedback(error)
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
            
            const{ props: { symbol }, state: { detail: { name, change_pct, last_trade_time, price, price_open, day_high, day_low, close_yesterday, stock_exchange_long, currency, gmt_offset }, profit, newPositionForm, error }, handleOnNewPositionSubmit, handleOnToNewPosition, handleOnCancel } = this
            
            

            return <section className="details"> 

                {error && <Feedback error={error} />}

                <header className="details__header">
                    <h3 className="details__title">{name}</h3>
                    {change_pct > 0 && <p className="details__relative-change details__relative-change--up"><i className="fas fa-sort-up details__change-icon details__change-icon--up"></i>   {change_pct}%</p>}
                    {change_pct < 0 && <p className="details__relative-change details__relative-change--down"><i className="fas fa-sort-down details__change-icon details__change-icon--down"></i>    {change_pct}%</p>}
                    {change_pct == 0 && <p className="details__relative-change"><strong>=</strong></p>}
                </header>
                <div className="details__positions">
                    {profit && <Profit profit={profit} />}
                    {!profit && <p className="details__no-positions">You have no open positions on this stock.</p>}
                    <button className="details__new-position" onClick={handleOnToNewPosition}>New position</button>
                    {newPositionForm && <NewPositionForm onPositionSubmit={handleOnNewPositionSubmit} symbol={symbol} onCancel={handleOnCancel} />}
                </div>
                <div className="details__section">
                    <p className="details__subtitle">{last_trade_time}</p>
                    <p className="details__key">Price: {price < price_open && <span className="details__value details__value--down">{price}</span>}{price > price_open && <span className="details__value details__value--up">{price}</span>}{price === price_open && <span className="details__value">{price}</span>}</p>
                    <p className="details__key">Open: {price_open < close_yesterday && <span className="details__value details__value--down">{price_open}</span>}{price_open > close_yesterday && <span className="details__value details__value--up">{price_open}</span>}{price_open === close_yesterday && <span className="details__value">{price_open}</span>}</p>
                    <p className="details__key">High: <span className="details__value details__value--up">{day_high}</span></p>
                    <p className="details__key">Low: <span className="details__value details__value--down">{day_low}</span></p>
                    <p className="details__key">Close Yesterday: <span className="details__value">{close_yesterday}</span></p>
                </div>
                <div className="details__section">
                    <p className="details__subtitle">Info</p>
                    <p className="details__key">Symbol: <span className="details__value">{symbol}</span></p>
                    <p className="details__key">Market: <span className="details__value">{stock_exchange_long}</span></p>
                    <p className="details__key">Currency: <span className="details__value">{currency}</span></p>
                    <p className="details__key">Timezone: <span className="details__value">GMT</span> {parseInt(gmt_offset) > 0 && <span className="details__value">+</span>}<span className="details__value">{(parseInt(gmt_offset) / 60) / 60}</span></p>   
                </div>
            </section>
        } else {
            return <p>Loading...</p>
        }
    }
}
