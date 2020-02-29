const { MongoClient } = require('mongodb')

const client = new MongoClient('mongodb://localhost:27017', {useUnifiedTopology: true})

client.connect()
    .then(() => {
        const db = client.db('events')
        const users = db.collection('users')

        users.insertOne({
            name: "Ana",
            surname: "Cano",
            email: "ana@cano.com",
            password: "123",
            likes: ["trap", "regaeeton del viejito", "cucumbers"]
        })
            .then(result => {
                const { insertedId: id } = result
                console.log(id)
                return users.findOne({
                    _id: id
                })
            })
            .then(user => console.log(user))
        
            .then (() => {
                users.insertOne({
                    name : "Darío",
                    surname: "Fedes",
                    email: "pistachitointrepido@gmail.com",
                    password: "123",
                    likes: ["pistachos", "nazicreativity", "badgazpacho"]
                })
                    .then(result => {
                        const { insertedId: id } = result
                        return users.findOne({
                            _id: id
                        })
                    })
                .then(user => console.log(user))
            })
    })
        

