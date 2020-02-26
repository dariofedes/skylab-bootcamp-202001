const fetch = require('../utils/fetch')

function __retrieveUserFavs__(token) {
    return fetch(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

        .then(response => {
            const { favs, error } = JSON.parse(response.content)

            if(error) throw new Error(error)

            return favs
        })
}

module.exports = __retrieveUserFavs__