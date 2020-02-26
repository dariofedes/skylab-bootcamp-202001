const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

function fetch(url, options = {}) {
    if(!(URL_REGEX.test(url))) {
        throw new SyntaxError(url + ' is not a valid url')
    }

    return new Promise((resolve, reject) => {
        const { method = 'GET', headers, body } = options
        
        const xhr = new XMLHttpRequest
    
        xhr.open(method, url)

        for (const key in headers)
            xhr.setRequestHeader(key, headers[key])

        xhr.addEventListener('load', function() {
            resolve({
                content: this.responseText,
                status: this.status
            } )
        })

        xhr.addEventListener('error', () => reject(new Error('Network error')))
    
        xhr.send(body)
    })
}

module.exports = fetch