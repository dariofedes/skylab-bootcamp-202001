const { database, database: { ObjectId } } = require('../data')

module.exports = function(userId) {
    const users = database.collection('users')
    const events = database.collection('events')

    return events.find({ subscribers: ObjectId(userId) }).toArray()
        .then(event => event)
}

// return users.findOne({ _id: ObjectId(userId) })
//         .then(({ subscribedEvents }) => {
//             if(!subscribedEvents) throw new Error('no subscribed events')

//             subscribedEvents && subscribedEvents.map(eventId => {
//                 return events.findOne({ _id: eventId })
//                     .then(event => event)
//             })})
//         .then(retrievedEvents =>  retrievedEvents)