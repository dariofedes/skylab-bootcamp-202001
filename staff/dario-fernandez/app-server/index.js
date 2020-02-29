const path = require('path')
const express = require('express')
const logger = require('./utils/logger')
const loggerMidWare = require('./utils/logger-mid-ware')
const { retrieveUser, authenticateUser, registerUser, searchVehicles } = require('./logic/index')
const { App, Login, Register, Home, Results } = require('./components/index')
const bodyParser = require('body-parser')
const session = require('express-session')

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8081] } = process

logger.path = path.join(__dirname, 'server.log')
logger.level = logger.INFO

logger.debug('setting up server')

const app = express()

app.use(loggerMidWare)
app.use(urlencodedBodyParser)
app.use(express.static(path.join(__dirname, 'public')))
app.use('/components', express.static(path.join(__dirname, 'components'))) // NOTE to see sass files in browser
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 3600000 }, resave: false, saveUninitialized: true }))

app.get('/', (req, res) => {
    res.send(App({ title: 'Karmazon', body: Landing(), acceptCookies }))
})

app.get('/login', (req, res) => {
    const { session: { acceptCookies, username } } = req

    if(username) return res.redirect(`/home/${username}`)

    res.send(App({ title: 'Login', body: Login(), acceptCookies }))
})

app.get('/register', (req, res) => {
    const { session: { acceptCookies, username } } = req
    
    if(username) return res.redirect(`/home/${username}`)

    res.send(App({ title: 'Register', body: Register(), acceptCookies }))
})

app.get('/home/:username', (req, res) => {
    
    const { params: { username }, session: { token, acceptCookies } } = req

    try {
        retrieveUser(token)
            .then(userInfo => {
                const { username: _username } = userInfo
                
                if(username !== _username) throw new Error('Access denied')

                res.send(App({ title: 'Home', body: Home(userInfo), acceptCookies}))

            })
            .catch(error => {
                res.send(App({ title: 'Login', body: Login(error), acceptCookies}))
            })
    } catch (error) {
        res.send(App({ title: 'Login', body: Login(error), acceptCookies}))
    }
})

app.post('/login', (req, res) => {
    const { body: { username, password }, session } = req
    const { acceptCookies } = session

    try {
        authenticateUser(username, password)
            .then(token => {
                session.token = token
                return retrieveUser(token)
            })
            .then(userInfo => {
                const { username } = userInfo

                res.redirect(`/home/${username}`)
            } )
            .catch(error => {
                logger.warn(error)

                const { session: { acceptCookies } } = req

                res.send(App({ title: 'Login', body: Login({ feedback: error }), acceptCookies }))
            })

    } catch(error) {
        res.send(App({ title: 'Login', body: Login({ feedback: error }), acceptCookies }))
    }
})

app.post('/register', (req, res) => {
    const { body: { name, surname, username, password }, session: acceptCookies } = req
try{
    registerUser({ name, surname, username, password }) 
    
        .then(()=> {
            res.redirect('/login')
        })
        .catch(function(error){
            
            res.send(App({ title: 'Register', body: Register({ feedback: error }), acceptCookies }))
        })
} catch(error){
    res.send(App({ title: 'Register', body: Register({ feedback: error }), acceptCookies }))
}
})

app.get('/search', (req, res) => {
    const { body: { query }, session: { token, acceptCookies, username } } = req

    searchVehicles(query, token)
        .then(results => res.send(App({ title: 'Results', body: Results({ results }), acceptCookies })))
        .catch(error => console.log(error))
})

app.post('/accept-cookies', (req, res) => {
    const { session } = req

    session.acceptCookies = true

    res.redirect(req.get('referer'))
})

app.listen(port, () => logger.info(`server up and listening in port ${port}.`))

process.on('SIGINT', () => {
    logger.warn('server abruptly stopped')

    process.exit()
})