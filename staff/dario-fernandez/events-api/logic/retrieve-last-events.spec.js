require('dotenv').config()

const { env: { MONGODB_TEST_URL } } = process
const retrieveLastEvents = require('./retrieve-last-events')
const { database, models: { Event }, database: { ObjectId } } = require('../data')
const { expect } = require('chai')

describe('retrieveLastEvents', () =>{
    let title, description, location, date, events
    const id = '5e5a6fe6afb09e1e5e35fb94'

    before(() => {
        return database.connect(MONGODB_TEST_URL)
            .then(() => events = database.collection('events'))
    })

    beforeEach(() => {
        title = `title-${Math.random()}`
        description = `description-${Math.random()}`
        location = `location-${Math.random()}`
        date = new Date

        const event = new Event({ publisher: ObjectId(id), title, description, location, date })

        return events.insertOne(event)
    })

    it('should succeed', () => {
        retrieveLastEvents()
            .then(lastEvents => {
                expect(lastEvents).to.be.an.instanceof(Array)
            })
    })
    after(() => {
        return events.deleteMany({})
            .then(() => database.disconnect())
    })
})