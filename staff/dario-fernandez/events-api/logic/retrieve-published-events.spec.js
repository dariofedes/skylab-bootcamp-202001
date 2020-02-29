require('dotenv').config()

const { env: { MONGODB_TEST_URL } } = process
const retrievePublishedEvents = require('./retrieve-published-events')
const { database, models: { User } } = require('../data')
const { expect } = require('chai')

describe('retrievePublishedEvents', () =>{
    let name, surname, email, password, id, users, title, description, location, date, events

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

        return users.insertOne(user)
            .then(({insertedId}) => {
                id = insertedId.toString()

                return events.insertOne({ title, description, location, date, publisher: id })
            })
            .then(({ insertedId }) => {
                return users.updateOne({ _id: id }, { $push: { publishedEvents: insertedId } })
            })
    })

    it('should succeed on valid user id and published events', () => {
        retrievePublishedEvents(id)
            .then(publishedEvents => {
                expect(publishedEvents).to.be.an.instanceof(Array)
            })
    })
    after(() => {
        return users.deleteMany({})
            .then(() => events.deleteMany({}))
            .then(() => database.disconnect())
    })
})