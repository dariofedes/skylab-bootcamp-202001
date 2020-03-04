const { models: { User } } = require('../data')
const { validate } = require('../utils')

module.exports = function(email, password) {
    validate.email(email)
    validate.string(password, 'password')

    return User.findOne({ email, password })
        .then(user => {
            if(!user) throw new Error('wrong credentials')

            user.authenticated = new Date

            return user.save()
        })
        .then(({ id }) => id.toString())
}