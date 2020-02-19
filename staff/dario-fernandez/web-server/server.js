const http = require('http')
const fs = require('fs')

const server = http.createServer((request, response) => {
    const rs = fs.createReadStream(request.url === '/' ? './index.html' : `.${request.url}.html`)

    rs.on('error', () => {
        response.writeHead(404, {  'Content-Type': 'text/html'  })
        response.end('<h1>Not found</h1>')
    })
        
    rs.on('data', chunk => {
        response.writeHead(200, {  'Content-Type': 'text/html'  })
        response.end(chunk.toString())
    })
})

server.listen(8080)