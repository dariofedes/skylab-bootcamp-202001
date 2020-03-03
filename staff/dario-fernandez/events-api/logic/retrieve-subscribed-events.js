const { database, database: { ObjectId } } = require('../data')

module.exports = function(userId) {
    const users = database.collection('users')
    const events = database.collection('events')

    return events.find({ subscribers: ObjectId(userId) }).toArray()
        .then(event => event)
}