const { database } = require('../data')
const { validate } = require('../utils')

module.exports = function(email, password) {
    validate.email(email)
    validate.string(password, 'password')

    const users = database.collection('users')

    return users.findOne({ email, password })
        .then(user => {
            if(!user) throw new Error('wrong credentials')

            return user._id.toString()
        })


    // const user = users.find(user => email === user.email && password === user.password)

    // if(!user) throw new Error('wrong credentials')


    // user.lastLogin = new Date

    // return fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 4))
    //     .then(() => user.id)
}