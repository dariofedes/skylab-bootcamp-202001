require('dotenv').config()

const { env: { MONGODB_TEST_URL } } = process
const createEvent = require('./create-event')
const { database, models: { User, Event } } = require('../data')
const { expect } = require('chai')

describe('subscribeEvent', () =>{
    let name, surname, email, password, userId, users, title, description, location, date, events, eventId

    before(() => {
        return database.connect(MONGODB_TEST_URL)
            .then(() => users = database.collection('users'))
            .then(() => events = database.collection('events'))
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
        event = new Event({ title, description, location, date })

        return users.insertOne(user)
            .then(({ insertedId }) => userId = insertedId.toString())
            .then(() => events.insertOne(event))
    })

    it('should succeed on valid user id and event id', () => {
        subscribeEvent(userId, eventId)
            .then(() => users.findOne({ _id: userId }))
            .then(({ subscriptors }) => {
                expect(subscriptors).to.be.an.instanceof(Array)
                return expect(subscriptors).to.have.lengthOf(1)
            })
            .then(() => events.findOne({ _id: eventId }))
            .then(({ subscribedEvents }) => {
                expect(subscribedEvents).to.be.an.instanceof(Array)
                return expect(subscribedEvents).to.have.lengthOf(1)
            })
    })
    after(() => {
        return users.deleteMany({})
            .then(() => events.deleteMany({}))
            .then(() => database.disconnect())
    })
})