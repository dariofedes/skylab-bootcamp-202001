const fetch = require('../utils/fetch')

function registerUser(user) {
    user.favs = []
    
    return fetch('https://skylabcoders.herokuapp.com/api/v2/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    
        .then(response => {
            if(response.content) {
                const { error } = JSON.parse(response.content)
                if(error) throw new Error(error)
            }
            return true
        })
}

module.exports = registerUser