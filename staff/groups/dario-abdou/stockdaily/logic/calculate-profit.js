function calculateProfit(company, token, callback) {
    const userSub = getSub(token)

    let totalInvested = 0
    let absoluteTotalNetProfit = 0

    call(retrieveURL(token), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }, (error, response) => {
        if(error) {
            callback(error)
        } else {
            const { investments } = JSON.parse(response.content)

            const positionIndex = investments.findIndex(element => element.company === company)

            const { positions } = investments[positionIndex];
            
            (function getTotalNetProfit(array, symbol, index, callback){
                const { amount, date } = array[index]

                totalInvested += amount

                call(historicalURL(symbol, date), undefined, (error, response) => {
                    if(error) {
                        callback(error)
                    } else {
                        const { data } = JSON.parse(response.content)
                        const { close: longPrice } = data[symbol]
                        console.log(longPrice)
                        call(detailsURL(symbol), undefined, (error, response) => {
                            if(error) {
                                callback(error)
                            } else {
                                const { price: currentValue } = (JSON.parse(response.content)).data[0]

                                const netProfit = parseFloat(((parseFloat(amount) * parseFloat(currentValue)) / parseFloat(longPrice)) - parseFloat(amount))

                                absoluteTotalNetProfit += parseFloat(netProfit)

                                if(array[index + 1]){
                                    getTotalNetProfit(array, symbol, index + 1, callback)
                                } else {
                                    callback(undefined, absoluteTotalNetProfit.toFixed(2))
                                }
                            }
                        })
                    }
                })
            })(positions, company, 0, callback);
        }
    })
}