const stockAPIURL = 'https://api.worldtradingdata.com/api/v1/'

const usersAPIURL = 'https://skylabcoders.herokuapp.com/api/v2/users/'

function searchURL(query) {
    return `${stockAPIURL}stock_search?search_term=${query}&search_by=symbol,name&api_token=${apiKey}`
}

function detailsURL() {
    let symbols = ''

    for(let i = 0; i < arguments.length; i++) {
        if(arguments[i + 1]) {
            symbols += `${arguments[i]},`
        } else {
            symbols += arguments[i]
        }
    }

    return `${stockAPIURL}stock?symbol=${symbols}&api_token=${apiKey}`
}

function historicalURL(symbol, date) {
    return `${stockAPIURL}history_multi_single_day?symbol=${symbol}&date=${date}&api_token=${apiKey}`
}

function retrieveURL(token) {
    return `${usersAPIURL}${getSub(token)}`
}