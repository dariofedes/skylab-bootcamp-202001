function searchDetails(symbol, callback) {
    const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${apiKey}`

    call(url, undefined, (error, response) => {
        if(error) {
            callback(error)
        } else {
            const { data } = JSON.parse(response.content)
            
            const [ details ] = data

            callback(undefined, details)
        }
    })
}