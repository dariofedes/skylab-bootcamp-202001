const fetch = require('../utils/fetch')

function authenticateUser(username, password) {
    return fetch('https://skylabcoders.herokuapp.com/api/v2/users/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            const { error, token } = JSON.parse(response.content)

            if(error) throw new Error(error)

            return token
        })

}

module.exports = authenticateUser


