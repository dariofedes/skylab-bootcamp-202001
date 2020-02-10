function getSymbol(query) {
    let symbol

    query = query.toLowerCase()

    for(key in stockSymbols) {
        if(query === key){
            symbol = key    
        } else if(stockSymbols[key] === query) {
            symbol = key
        }
    }

    if(symbol) {
        return symbol.toUpperCase()
    } else {
        return new Error('No results')
    }
}