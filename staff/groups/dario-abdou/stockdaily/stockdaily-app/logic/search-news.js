function searchNews (query, callback) {
    if (typeof query !== 'string') { throw new TypeError(`query ${query} is not a string`) }
    if (typeof callback !== 'function') { throw new TypeError(`callback ${callback} is not a function`) }
    
    call(`https://newsapi.org/v2/everything?q=${query}&apiKey=6bd7c136390a4b8aba315ecb0395049e`, undefined,
    (error, response) => {
        if(error) {
            callback(error)  
        } 

        else if(response.status === 401) {
            const { error: _error } = JSON.parse(response.content)
            callback(_error)
            
        } else if(response.status === 400) {
            const { error: _error } = JSON.parse(response.content)
            callback(_error)

        } else if(response.status === 200) {
            const { news } = JSON.parse(response.content)
            callback(undefined, news)
        }       
    })
}