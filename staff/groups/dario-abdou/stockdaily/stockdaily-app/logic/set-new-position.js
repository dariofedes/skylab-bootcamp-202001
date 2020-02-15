// /**
//  * logic - authenticate-user
//  * @param {object} position - keys: date, amount & symbol
//  * @param {string} token - User authorization
//  * @param {function} callback - function 
//  * @returns {undefined} 
//  */

function setNewPosition(position, token, callback) {
    const { date, amount, symbol } = position

    const newPosition = { date, amount }

    call(historicalURL(symbol, date), undefined, (error, response) => {
        if(error) {
            callback(error)
        } else if(JSON.parse(response.content).message) {
            callback(new Error('No price data for this date, please select a defferent date.'))
        } else {
            call(usersURL(), {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }, (error, response) => {
                if(error) {
                    callback(error)
                } else if(response.status !== 200) {
                    callback(new Error('Authentication Error. Please, logout and authenticate again.'))
                } else {
                    const { investments } = JSON.parse(response.content)

                   pushNewPosition(investments, newPosition, symbol)

                    call(usersURL(), {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(investments)
                    }, (error, response) => {
                        if(error) {
                            callback(error)
                        } else if(response.status !== 204) {
                            callback(new Error('Authentication Error. Please, logout and authenticate again.'))
                        } else {
                            callback(undefined, response.status)
                        }
                    })              
                }
            })
        }
    })
}