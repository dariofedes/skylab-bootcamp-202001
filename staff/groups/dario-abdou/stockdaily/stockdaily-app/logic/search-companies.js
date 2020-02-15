/**
 * logic - searchCompanies
 * @param {string} query - the search term
 * @param {string} token - User autorization
 * @param {function} callback - function 
 * @returns {Array} data - an array with the search results
 */

function searchCompanies(query, token, callback) {
    const searchURL = `https://api.worldtradingdata.com/api/v1/stock_search?search_term=${query}&search_by=symbol,name&api_token=${apiKey}`
    


    call(usersURL(token), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }, (error, response) => {
        if(error){
            callback(error)
        } else if(response.status === 401) {
            callback(new Error('Authorization error, please login again'))
        } else {
            const { investments } = JSON.parse(response.content)

            call(searchURL, undefined, (error, response) => {
                if(error) {
                    callback(error)
                } else if(!JSON.parse(response.content).data.length) {
                    callback(new Error('No results'))
                } else {
                    const { data: results }  = JSON.parse(response.content)
        
                    if(!results.length) {
                        callback(new Error('No results'))
                    } else {
                        let symbols = ''
        
                        results.forEach((element, index) => {
                            const{ symbol } = element
        
                            if(results[index + 1]) {
                                symbols += `${symbol},`
                            } else {
                                symbols += `${symbol}`
                            }
                        })
        
                        const detailsURL = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbols}&api_token=${apiKey}`
                                        
                        call(detailsURL, undefined, (error, response) => {
                            if(error) {
                                callback(error)
                            } else if(!JSON.parse(response.content).data) {
                                callback(new Error('No stocks found'))
                            } else {
                               const { data } = JSON.parse(response.content)



                               data.forEach(company => {
                                   if(investments.some(investedCompany => company.symbol === investedCompany.company )) {
                                       company.invested = true
                                   }
                               })
        
                               callback(undefined, data)
                            }
                        })
                    }
                }
            })
        }
    })
}