const { database, models: { User } } = require('../data')
const { validate } = require('../utils')




module.exports = function(name, surname, email, password) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.email(email)
    validate.string(password, 'password')

    const users = database.collection('users')

    return users.findOne({ email })
        .then(user => {
            if(user) throw new Error(`${email} already in use`)

            user = new User({ name, surname, email, password })

            return users.insertOne(user)
        })
        .then(() => {})
}