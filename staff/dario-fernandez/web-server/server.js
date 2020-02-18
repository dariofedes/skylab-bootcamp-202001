const net = require('net')
const fs = require('fs')


const server = net.createServer(socket => {
    socket.on('data', chunk => {
        const pageRequest = chunk.toString().split(' ')[1]

        if(pageRequest === '/') {
            socket.write(`HTTP/1.1 200
Content-Type: text/html

`)
            const rs = fs.createReadStream('./index.html')
            
            rs.on('data', chunk => {
                socket.write(chunk)
            })

            rs.on('end', () => socket.destroy())
        } else {
            socket.write(`HTTP/1.1 200
Content-Type: text/html

`)
            const rs = fs.createReadStream(`./${pageRequest}.html`)
            
            rs.on('data', chunk => {
                socket.write(chunk)
            })

            rs.on('end', () => socket.destroy())
        }
    })
})

server.listen(8080)
