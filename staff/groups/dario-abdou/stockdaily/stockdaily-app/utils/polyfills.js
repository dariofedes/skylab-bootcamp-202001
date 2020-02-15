function pushNewPosition(array, position, symbol) {
    const index = array.findIndex(element => element.company === symbol)

    if(index < 0) {
        const { date, amount } = position

        const newPosition = {

            company: symbol,
            positions: [
                {
                    date,
                    amount
                }
            ]
        }
        array.push(newPosition)
    } else {
        array[index].positions.push(position)
    }
}