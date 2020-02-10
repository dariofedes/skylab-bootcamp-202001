for(let i = 0; i < 10; i++) {
    const url = 'https://api.worldtradingdata.com/api/v1/stock_search?search_term=microsoft&api_token=OUlrIsT8XxrbhApRytX8eAOWpBzWXRQqt3Z6tleaW7zhIptzAFuFKik2IIjf&search_by=symbol,name'

    call(url, undefined, (error, response) => console.log(response))
}