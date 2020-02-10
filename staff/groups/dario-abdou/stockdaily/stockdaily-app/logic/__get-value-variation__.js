function getValueVariation(symbol, marketOpen, callback) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&apikey=${getAPIKey()}`

    
    call(url, undefined, (error, response) => {
        if(error){
            callback(error)
        } else if (response.status === 200) {
            const data = JSON.parse(response.content)

            const lastRefresh = data["Meta Data"]["3. Last Refreshed"]

            const currentValue = data[`Time Series (60min)`][lastRefresh]["4. close"]

            const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${getAPIKey()}`

            call(url, undefined, (error, response) => {
                if(error){
                    callback(error)
                } else {
                    const data = JSON.parse(response.content)

                    const lastRefresh = data["Meta Data"]["3. Last Refreshed"]

                    const refferenceValue = data[`Time Series (Daily)`][`${lastRefresh}`]["1. open"]

                    const absoluteVariation = (currentValue - refferenceValue).toFixed(1)

                    const relativeVariation = (absoluteVariation * 100 / refferenceValue).toFixed(1)
                    
                    callback(undefined, absoluteVariation, relativeVariation)
                }
            })       
        }
    })
}