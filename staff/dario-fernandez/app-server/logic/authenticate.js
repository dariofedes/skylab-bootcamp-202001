const users = require('../utils/data')

function authenticate(username, password) {
    return users.some(element => element.username === username && element.password === password)
}

module.exports = authenticate