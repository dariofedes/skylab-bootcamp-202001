const  mongoose = require('mongoose')
const { models: { User } } = require('../data')
const { validate } = require('../utils')




module.exports = function(name, surname, email, password) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.email(email)
    validate.string(password, 'password')

    
    return User.findOne({ email })
    .then(user => {
        if(user) throw new Error('email already in use')
        
        user = new User({ name, surname, email, password })
        user.save()
        })
}