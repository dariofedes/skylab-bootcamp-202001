const users = require('../utils/data')

function register(user) {
    const { username } = user

    const userExists = users.some(function(element) {
        return username === element.username
    })

    if(userExists) {
        return userExists
    } else {
        users.push(user)
        return userExists
    }

}

module.exports = register

