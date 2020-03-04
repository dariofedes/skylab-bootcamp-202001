require('dotenv').config()

const { env: { MONGODB_TEST_URL } } = process
const authenticateUser = require('./authenticate-user')
const mongoose = require('mongoose') 
const { models: { User } } = require('../data')
const { expect } = require('chai')

describe('authenticateUser', () => {
    let name, surname, email, password, user

    before(() => {
        return mongoose.connect(MONGODB_TEST_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    })
    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        user = new User({ name, surname, email, password })

        return user.save()
    })

    it('should succeed on correct creentials', () => {
        return authenticateUser(email, password)
            .then(id => {
                expect(id).to.be.a('string')
            })
    })

    it('should save the last authentication date', () => {
        return authenticateUser(email, password)
            .then(id => {
                return User.findOne({ _id: id })
            })
            .then(({ authenticated }) => {
                expect(authenticated).to.be.an.instanceof(Date)
            })
    })
    // it('should return a valid id', () => {
    //     authenticateUser(email, password)
    //         .then(id => {
    //             expect(id).to.have.lengthOf(36)
    //             expect(id.split('-')[0]).to.have.lengthOf(8)
    //             expect(id.split('-')[1]).to.have.lengthOf(4)
    //             expect(id.split('-')[2]).to.have.lengthOf(4)
    //             expect(id.split('-')[3]).to.have.lengthOf(4)
    //             expect(id.split('-')[4]).to.have.lengthOf(12)
    //         })
    // })
    // it('should throw on non registered email', ()=> {
    //     const wrongEmail = `wrong-${email}`
    //     expect(()=> authenticateUser(wrongEmail, password)).to.throw(Error, 'wrong credentials')
    // })
    // it('should throw on wrong password', ()=> {
    //     const wrongPassword = `wrong-${password}`
    //     expect(()=> authenticateUser(email, wrongPassword)).to.throw(Error, 'wrong credentials')
    // })
    // it('should throw on empty email', ()=> {
    //     const emptyEmail= ""
    //     expect(()=> authenticateUser(emptyEmail, password)).to.throw(Error,  `${emptyEmail} is not an email`)
    // })
    
    // it('should throw on empty password', ()=> {
    //     const emptyPassword= ""
    //     expect(()=> authenticateUser(email, emptyPassword)).to.throw(Error,  `password is empty`)
    // })

    // afterEach(() => {
    //     const userIndex = users.indexOf(user => user.email === email)

    //     users.splice(userIndex, 1)

    //     fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 4))
    // })

    after(() => {
        User.deleteMany({})
            .then(() => mongoose.disconnect())
    })
})