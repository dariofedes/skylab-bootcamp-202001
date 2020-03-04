const { models: { Event, User } } = require('../data')
const mongoose = require('mongoose')
const { SchemaType: { ObjectId } } = mongoose
const { validate } = require('../utils')

module.exports = function(publisher, title, description, location, date) {
    validate.string(publisher, 'publisher')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(location, 'location')
    validate.type(date, 'date', Date)

    const event = new Event({ title, description, location, date, publisher }) 

    return event.save()
        .then(({ _id, publisher }) => {
            return User.findOne({ _id: publisher })
                .then(user => {
                    if(user.publishedEvents){
                        user.publishedEvents.push(_id)
                    } else {
                        user.publishedEvents = [_id]
                    }

                    return user.save()
                        .then(() => _id)
                        
                })
        })
}