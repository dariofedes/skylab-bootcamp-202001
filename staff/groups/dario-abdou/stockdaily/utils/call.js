function call(url, options = { method: 'GET' }, callback) {
    const { method, headers, body } = options
    
    
    const xhr = new XMLHttpRequest

    xhr.open(method, url)

    for(key in headers) {
        xhr.setRequestHeader(key, headers[key])
    }

    xhr.addEventListener('load', function() {
        callback(undefined, {
            content: this.responseText,
            status: this.status
        })
    })

    xhr.addEventListener('error', () => {
        callback(new Error('Newtwork error'))
    })

    xhr.send(body)
}