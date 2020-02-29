const { database, database: { ObjectId } } = require('../data')

module.exports = function(eventId, userId) {
    const users = database.collection('users')

    return users.updateOne({ _id: ObjectId(userId) }, { $push: { publishedEvents: eventId } })
        .then(() => {})
}