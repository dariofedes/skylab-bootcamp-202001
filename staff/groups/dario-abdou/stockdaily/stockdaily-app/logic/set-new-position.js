function setNewPosition(position, token, callback) {
    const { date, amount, symbol } = position

    const newPosition = { date, amount }

    const userSub = getSub(token)

    const getURL = `https://skylabcoders.herokuapp.com/api/v2/users/${userSub}`
    const patchURL = `https://skylabcoders.herokuapp.com/api/v2/users/`

    call(getURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }, (error, response) => {
        if(error) {
            callback(error)
        } else {
            const { investments } = JSON.parse(response.content)

            pushNewPosition(investments, newPosition, symbol)

            call(patchURL, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, body: JSON.stringify({ investments })
            }, (error, response) => {
                if(error) {
                    callback(error)
                } else {
                    callback(undefined, response)
                }
            })
        }
    })
}