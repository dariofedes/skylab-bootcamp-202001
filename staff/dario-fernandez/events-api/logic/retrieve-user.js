const { models: { User } } = require('../data')
const { validate } = require('../utils')

module.exports = function(id) {
    validate.string(id, 'id')


    return User.findById(id)
        .then(user => {
            if(!user) throw new Error('user not found')

            user.retrieved = new Date

            return user.save()
        })
        .then(({ name, surname, email }) => ({ name, surname, email }))
}