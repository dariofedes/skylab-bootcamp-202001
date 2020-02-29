require('dotenv').config()

const { env: { MONGODB_TEST_URL } } = process
const createEvent = require('./create-event')
const { database, models: { User } } = require('../data')
const { expect } = require('chai')

describe('createEvent', () =>{
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
            .then(inserted => id = inserted.insertedId.toString())
    })

    it('should succeed on valid publisher id and event parameters', () => {
        createEvent(id, title, description, location, date)
            .then(returned => {
                expect(returned).to.be.undefined
            })
    })
    after(() => {
        return users.deleteMany({})
            .then(() => events.deleteMany({}))
            .then(() => database.disconnect())
    })
})