const path = require('path')
const express = require('express')
const logger = require('./utils/logger')
const loggerMidWare = require('./utils/logger-mid-ware')
const authenticate = require('./logic/authenticate.js')
const register = require('./logic/register')
const app = express()
const { argv: [, , port = 8081] } = process

logger.path = path.join(__dirname, 'server.log')
logger.level = logger.INFO

logger.debug('setting up server')

app.use(loggerMidWare)

app.post('/authenticate', (request, response) => {
    request.on('data', chunck => {
        let body = ''
        body += chunck.toString()
        const username = body.split('&')[0].split('=')[1]
        const password = body.split('&')[1].split('=')[1]
        if(authenticate(username, password)) {
            console.log('Access granted')
            response.end(`<h1>Hello ${username}</h1>`)
        } else {
            console.log('Access denied')
            response.end(`<h1>Wrong credentials</h1>`)
        }
    })
})

app.post('/register-user', (request, response) => {
    request.on('data', chunck => {
        let body = ''
        body += chunck.toString()
        const name = body.split('&')[0].split('=')[1]
        const surname = body.split('&')[1].split('=')[1]
        const username = body.split('&')[2].split('=')[1]
        const password = body.split('&')[3].split('=')[1]
        if(register({ name, surname, username, password })) {
            response.end('<h1>Username already in use</h1>')
        } else {
            response.redirect('/login')
        }
    })
})


app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }))

app.listen(port, () => logger.info(`server up and listening in port ${port}.`))

process.on('SIGINT', () => {
    logger.warn('server abruptly stopped')

    process.exit()
})