const { database, database: { ObjectId } } = require('../data')
const { validate } = require('../utils')

module.exports = function(userId, eventId) {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    const events = database.collection('events')
    const users = database.collection('users')

    return users.findOne({ _id: ObjectId(userId) })
        .then(({ subscribedEvents }) => subscribedEvents && subscribedEvents.some(event => event.toString() === eventId))
        .then(subscribed => {
            if(subscribed) throw new Error('user already subscribed to this event')
            
            return events.updateOne({ _id: ObjectId(eventId) }, { $push: { subscribers: ObjectId(userId) } })
        })
        .then(() => users.updateOne({ _id: ObjectId(userId) }, { $push: { subscribedEvents: ObjectId(eventId) } }))
        .then(() => {})
}