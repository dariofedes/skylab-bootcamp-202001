require('dotenv').config()

const { env: { MONGODB_TEST_URL } } = process
const retrieveUser = require('./retrieve-user')
const mongoose = require('mongoose') 
const { models: { User } } = require('../data')
const { expect } = require('chai')

describe('retrieveUser', () =>{
    let name, surname, email, password, userId

    before(() => {
        return mongoose.connect(MONGODB_TEST_URL)
    })

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        user = new User({ name, surname, email, password })

        return user.save()
            .then(({ id }) => userId = id.toString())

    })

    it('should not throw on valid id', () => {
        return retrieveUser(userId)
            .then(({ name: _name, surname: _surname, email: _email }) => {
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
        return User.deleteMany({})
            .then(() => mongoose.disconnect())
    })
})