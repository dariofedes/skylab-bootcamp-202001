const { database, database: { ObjectId } } = require('../data')
const { validate } = require('../utils')

module.exports = function(id) {
    validate.string(id, 'id')

    const users = database.collection('users')
    
    const _id = ObjectId(id)

    return users.findOne({ _id })
        .then(user => {
            debugger
            if(user.publishedEvents) return user.publishedEvents

            return []
        })
}