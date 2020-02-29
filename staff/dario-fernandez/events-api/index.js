require('dotenv').config()

const { env: { PORT = 8080, NODE_ENV: env, MONGODB_URL }, argv: [ , , port = PORT ] } = process

const express = require('express')
const winston = require('winston')
const bodyParser = require('body-parser')
const { name, version } = require('./package')
const jsonBodyParser = bodyParser.json()
const { database } = require('./data')
const { jwtVerifierMidWare } = require('./mid-wares')
const { registerUser, authenticateUser, retrieveUser, createEvent, retrievePublishedEvents, retrieveLastEvents } = require('./routes')

database.connect(MONGODB_URL)
    .then(() => {
        const logger = winston.createLogger({
            level: env === 'development' ? 'debug' : 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.File({ filename: 'server.log' })
            ]
        })
        
        const app = express()

        app.post('/users', jsonBodyParser, registerUser)

        app.post('/auth', jsonBodyParser, authenticateUser)

        app.get('/users', jwtVerifierMidWare, retrieveUser)

        app.post('/users/:id/events', jwtVerifierMidWare, jsonBodyParser, createEvent)
        
        app.get('/users/:id/events', jwtVerifierMidWare, retrievePublishedEvents)

        app.get('/events', retrieveLastEvents)

        app.listen(port, () => logger.info(`server ${name} ${version} up and listening in port ${port}`))
        process.on('SIGINT', () => {
            logger.info('server abruptly stopped')
            
            process.exit(0)
        })
    })