const { database, database: { ObjectId }, models: { Event } } = require('../data')
const { validate } = require('../utils')

module.exports = function(publisher, title, description, location, date) {
    validate.string(publisher, 'publisher')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(location, 'location')
    validate.type(date, 'date', Date)

    const events = database.collection('events')

    return events.insertOne(new Event({ publisher: ObjectId(publisher), title, description, location, date }))
        .then(({ insertedId }) => insertedId.toString())
}