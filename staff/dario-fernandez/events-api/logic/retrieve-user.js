const { database, database: { ObjectId } } = require('../data')
const { validate } = require('../utils')

module.exports = function(id) {
    validate.string(id, 'id')

    

    const _id = new ObjectId(id)
    const users = database.collection('users')

    return users.findOne({ _id })
        .then(user => {
            if(!user) throw new Error('user not found')

            return users.updateOne({ _id }, { $set: { lastRetrieved: new Date } })
                .then(() => {
                    const { name, surname, email } = user
                    return { name, surname, email }
                })
        })
}