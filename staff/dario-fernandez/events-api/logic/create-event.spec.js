require('dotenv').config()

const { env: { MONGODB_TEST_URL } } = process
const createEvent = require('./create-event')
const { models: { User, Event } } = require('../data')
const mongoose = require('mongoose')
const { expect } = require('chai')

describe('createEvent', () =>{
    let name, surname, email, password, id, user, title, description, location, date

    before(() => {
        return mongoose.connect(MONGODB_TEST_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    })

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        title = `title-${Math.random()}`
        description = `description-${Math.random()}`
        location = `location-${Math.random()}`
        date = new Date
        

        user = new User({ name, surname, email, password })

        return user.save(user)
            .then(({ _id } ) => id = _id)
    })

    it('should succeed on valid publisher id and event parameters', () => {
        createEvent(id.toString(), title, description, location, date)
            .then(eventID => {
                expect(eventId).to.exist
            })
    })
    
    it('should push the event id to user\'s publishedEvents array', () => {
        createEvent(id.toString(), title, description, location, date)
            .then((eventId) => {
                return User.findOne({ _id: id })
                    .then(({ publishedEvents }) => {
                        expect(publishedEvents).to.be.an.instanceOf(Array)
                        expect(publishedEvents).to.have.length(1)

                    })
            })
            
    })

    after(() => {
        return User.deleteMany({})
            .then(() => Event.deleteMany({}))
            .then(() => mongoose.disconnect())
    })
})