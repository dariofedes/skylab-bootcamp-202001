const { database, database: { ObjectId }, models: { Event } } = require('../data')
const { validate } = require('../utils')

module.exports = function(eventId, updates, userId) {
    const validFields = ['title', 'description', 'location', 'date']

    for(key in updates) {
        if(!validFields.some(field => field === key)) throw new Error('invalid field')
        if(!updates[key]) throw new Error('empty field')
        if(key === 'date'){
            validate.type(key, 'date', Date)
        } else {
            validate.string(key, key.toString(), String)
        }
        
    }

    const events = database.collections('events')

    return events.findOne({ _id: ObjectId(eventId) })
        .then(({ publisher }) => {
            if(publisher !== ObjectId(userId)) throw new Error('permission denied')

            return events.updateOne({ _id: ObjectId(eventId) }, { $set: updates })
        })
        .then(() => {})
}