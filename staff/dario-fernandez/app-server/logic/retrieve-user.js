const call = require('../utils/call')

function retrieveUser(token, callback) {

    call(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }, (error, response) => {
        if(error) {
            return callback(error)
        } else if (response.status === 400) {
            callback(new Error('Wrong user id'))
        } else if(response.status === 401) {
            callback(new Error('Wrong token'))
        } else if(response.status === 200) {
            const {name, surname, username }  = JSON.parse(response.content)
            debugger
            callback(undefined, { name, surname, username })
        } else {
            callback(new Error('Unknown error'))
        }
    })
}

module.exports = retrieveUser