require('dotenv').config()

const { env: { PORT = 8080, NODE_ENV: env, MONGODB_URL }, argv: [ , , port = PORT ] } = process

const express = require('express')
const winston = require('winston')
const bodyParser = require('body-parser')
const { name, version } = require('./package')
const jsonBodyParser = bodyParser.json()
const mongoose = require('mongoose')
const { jwtVerifierMidWare } = require('./mid-wares')
const { registerUser,
    authenticateUser,
    retrieveUser,
    createEvent,
    retrievePublishedEvents,
    retrieveLastEvents,
    subscribeEvent,
    retrieveSubscribedEvents,
    updateEvent  
} = require('./routes')

const logger = winston.createLogger({
    level: env === 'development' ? 'debug' : 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'server.log' })
    ]
})

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => logger.info('connected to database'))

const app = express()

app.post('/users', jsonBodyParser, registerUser)

app.post('/auth', jsonBodyParser, authenticateUser)

app.get('/users', jwtVerifierMidWare, retrieveUser)

app.post('/users/:id/events', jwtVerifierMidWare, jsonBodyParser, createEvent)

app.get('/users/:id/events', jwtVerifierMidWare, retrievePublishedEvents)

app.get('/events', retrieveLastEvents)

app.patch('/users/:id/events', jwtVerifierMidWare, jsonBodyParser, subscribeEvent)

app.get('/users/:id/subs', jwtVerifierMidWare, retrieveSubscribedEvents)

app.patch('/events', jwtVerifierMidWare, jsonBodyParser, updateEvent)

app.listen(port, () => logger.info(`server ${name} ${version} up and listening in port ${port}`))

process.on('SIGINT', () => {
    logger.info('server abruptly stopped')
    
    process.exit(0)
})