function __retrieveCurrentValue__(stock, interval, callback) {
    const symbol = getSymbol(stock)

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`

    call(url, undefined, (error, response) => {
        if(error){
            callback(error)
        } else if (response.status === 200) {
            const data = JSON.parse(response.content)

            const lastRefresh = data["Meta Data"]["3. Last Refreshed"]

            const lastCloseValue = data[`Time Series (${interval})`][lastRefresh]["4. close"]

            callback(lastCloseValue)
        }
    })
}