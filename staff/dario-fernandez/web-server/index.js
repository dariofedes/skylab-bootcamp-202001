const path = require('path')
const express = require('express')
const logger = require('./utils/logger')
const loggerMidWare = require('./utils/logger-mid-ware')
const app = express()
const { argv: [, , port = 8081] } = process

logger.path = path.join(__dirname, 'server.log')
logger.level = logger.INFO

logger.debug('setting up server')

app.use(loggerMidWare)

app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }))

app.listen(port, () => logger.info(`server up and listening in port ${port}.`))

process.on('SIGINT', () => {
    logger.warn('server abruptly stopped')

    process.exit()
})