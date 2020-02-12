function NewPositionForm({ onPositionSubmit, symbol, onCancel }) {
        const today = new Date
        
        const year = today.getFullYear()
        const month = today.getMonth() + 1 < 10? `0${today.getMonth() + 1}` : today.getMonth() + 1
        const day = today.getDate() < 10? `0${today.getDate()}` : today.getDate()
        
        const todayDate = `${year}-${month}-${day}`

    return <form className="new-position" onSubmit={event => {
                event.preventDefault()

                const position = {
                    amount: event.target.amount.value,
                    date: event.target.date.value,
                    symbol: symbol
                }

                onPositionSubmit(position)
            }}>
                <div className="new-position__inputs">
                    <input className="new-position__input" placeholder="Date" type="date" name="date" max={todayDate} />
                    <input className="new-position__input" placeholder="Amount" type="number" name="amount" />
                </div>
                <div className="new-position__actions">
                    <button className="new-position__button" type="submit">Submit</button>
                    <button className="new-position__button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
            
}
