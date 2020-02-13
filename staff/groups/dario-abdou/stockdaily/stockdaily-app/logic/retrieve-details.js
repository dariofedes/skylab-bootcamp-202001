function retrieveDetails(symbol, callback) {
    const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${apiKey}`

    call(url, undefined, (error, response) => {
        if(error) {
            callback(error)
        } else if(!JSON.parse(response.content).data) {
            callback(new Error('No stocks found'))
        } else {
            const { data } = JSON.parse(response.content)
            
            const [ details ] = data

            callback(undefined, details)
        }
    })
}