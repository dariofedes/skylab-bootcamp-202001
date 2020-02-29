const Model = require('./model')
const { user } = require('../schemas')

module.exports = class User extends Model {
    constructor(data) {
        super(data, user)

        this.created = new Date
    }
}