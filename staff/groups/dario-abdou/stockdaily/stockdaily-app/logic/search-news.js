function searchNews (query, callback) {
    if (typeof query !== 'string') { throw new TypeError(`query ${query} is not a string`) }
    if (typeof callback !== 'function') { throw new TypeError(`callback ${callback} is not a function`) }
    
    call(`https://newsapi.org/v2/everything?q=${query}&apiKey=6bd7c136390a4b8aba315ecb0395049e`, undefined,
    (error, response) => {
        if (error) return callback(error)

        if (response.content) {
            const { error: _error, news } = JSON.parse(response.content)
            // , { error: _error } = news
            
            if(_error) return callback(new Error(_error))

            console.log(error)
            callback(undefined, news)
        }
    })
}