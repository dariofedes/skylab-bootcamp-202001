const path = require('path')
const express = require('express')
const logger = require('./utils/logger')
const loggerMidWare = require('./utils/logger-mid-ware')
const { retrieveUser, authenticateUser, registerUser } = require('./logic/index')
const { App, Login, Register, Home } = require('./components/index')
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
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: true }))



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

    retrieveUser(token, (error, userInfo) => {
        if(error) return res.send(App({ title: 'Login', body: Login({ feedback: error }), acceptCookies }))

        const { username: _username } = userInfo
        
        if(username !== _username) return res.send(App({ title: 'Login', body: Login(), acceptCookies }))
        
        res.send(App({ title: 'Home', body: Home(userInfo), acceptCookies }))
    })

})


app.post('/login', (req, res) => {
    const { body: { username, password }, session } = req
    const { acceptCookies } = session

    authenticateUser(username, password, (error, token) => {
        if(error) return res.send(App({ title: 'Login', body: Login({ feedback: error }), acceptCookies }))
        
        retrieveUser(token, (error, userInfo) => {
            if(error) return res.send(App({ title: 'Login', body: Login({ feedback: error }), acceptCookies }))
            
            session.token = token
            const { username } = userInfo
            session.username = username 
            res.redirect(`/home/${username}`)
        })
        
    })
})

app.post('/register', (req, res) => {
    const { body: { name, surname, username, password }, session: acceptCookies } = req

    registerUser({ name, surname, username, password }, (error) => {
        if(error) return res.send(App({ title: 'Login', body: Login({ feedback: error }), acceptCookies }))

        res.redirect('/login')
    })
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