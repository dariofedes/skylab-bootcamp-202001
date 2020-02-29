require('dotenv').config()

const { env: { MONGODB_TEST_URL } } = process
const { retrieveUser } = require('../logic')
const { database, models: { User } } = require('../data')
const { expect } = require('chai')

describe('retrieveUser', () =>{
    let name, surname, email, password, id, users

    before(() => {
        return database.connect(MONGODB_TEST_URL)
            .then(() => users = database.collection('users'))
    })

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        user = new User({ name, surname, email, password })

        return users.insertOne(user)
            .then(inserted => id = inserted.insertedId.toString())

    })

    it('should not throw on valid id', () => {
        return retrieveUser(id)
            .then(userInfo => {
                debugger
                const { name: _name, surname: _surname, email: _email } = userInfo
                expect(_name).to.equal(name)
                expect(_surname).to.equal(surname)
                expect(_email).to.equal(email)
            })
    })

    // it('should return the name, surname and email', () => {
    //     return retrieveUser(id)
    //         .then(userInfo => {
    //             const { _name, _surname, _email } = userInfo

    //             expect(_name).to.equal(name)
    //             expect(_surname).to.equal(surname)
    //             expect(_email).to.equal(email)
    //         })
    // })

    // afterEach(() => {
    //     const userIndex = users.indexOf(user => user.id === id)

    //     users.splice(userIndex, 1)

    //     fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 4))
    // })

    after(() => {
        return users.deleteMany({})
            .then(() => database.disconnect())
    })
})