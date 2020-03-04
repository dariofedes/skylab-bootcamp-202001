require('dotenv').config()

const { env: { MONGODB_TEST_URL } } = process
const { expect } = require('chai')
const { registerUser } = require('./index')
const mongoose = require('mongoose')
const { models: { User } } = require('../data')

describe('registerUser', () => {
    let name, surname, email, password, users

    before(() => {
        return mongoose.connect(MONGODB_TEST_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    })

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
    })

    it('should not to return', () => {
        registerUser(name, surname, email, password)
            .then(value => {
                expect(value).to.be.undefined
            })
    })

    it('should succeed on correct data', () => {
        registerUser(name, surname, email, password)
            .then(() => {
                return User.findOne({ email })
            })
            .then(user => {
                expect(user).to.exist
                expect(user._id).to.be.instanceOf(ObjectId)
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password) // TODO encrypt this field!
                expect(user.created).to.be.instanceOf(Date)
            })
    })
    // it('should not throw on regster existing user with different email', () => {
    //     const differentEmail = `different-${email}`

    
    // })

    // it('should throw on existing user', () => {
    //     expect(() => registerUser(name, surname, email, password)).to.throw(Error, `${email} already in use`)
    // })

    // it('should only throw on in use email', () => {
    //     const newName = `new-${name}`
    //     const newSurname = `new-${surname}`
    //     const newPassword = `new-${password}`
    //     expect(() => registerUser(newName, newSurname, email, newPassword)).to.throw(Error, `${email} already in use`)

    //     let userIndex = users.indexOf(user => user.email === email)

    //     users.splice(userIndex, 1)

    //     fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 4))

    //     userIndex = users.indexOf(user => user.email === email)

    //     users.splice(userIndex, 1)

    //     fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 4))
    // })

    after(() => {
        return User.deleteMany({})
            .then(() => mongoose.disconnect())
    })
})