const stockAPIURL = 'https://api.worldtradingdata.com/api/v1/'

const usersAPIURL = 'https://skylabcoders.herokuapp.com/api/v2/users/'

function searchURL(query) {
    return `${stockAPIURL}stock_search?search_term=${query}&search_by=symbol,name&api_token=${apiKey}`
}

function detailsURL() {
    let symbols = ''

    aguments.forEach((element, index) => {
        if(arguments[index + 1]) {
            symbols += `${element},`
        } else {
            symbols += element
        }
    })

    return `${stockAPIURL}stock?symbol=${symbols}&api_token=${apiKey}`
}

function retrieveURL(token) {
    return `${usersAPIURL}${getSub(token)}`
}