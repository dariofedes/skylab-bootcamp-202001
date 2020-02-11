function NewPositionForm({ onPositionSubmit, symbol, onCancel }) {
        const today = new Date
        
        const year = today.getFullYear()
        const month = today.getMonth() + 1 < 10? `0${today.getMonth() + 1}` : today.getMonth() + 1
        const day = today.getDate() < 10? `0${today.getDate()}` : today.getDate()
        
        const todayDate = `${year}-${month}-${day}`

    return <form onSubmit={event => {
                event.preventDefault()

                const position = {
                    amount: event.target.amount.value,
                    date: event.target.date.value,
                    symbol: symbol
                }

                onPositionSubmit(position)
            }}>
                <input type="date" name="date" max={todayDate} />
                <input type="number" name="amount" />
                <button type="submit">Submit</button>
                <button onClick={onCancel}>Cancel</button>
            </form>
            
}
