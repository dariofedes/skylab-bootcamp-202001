function isSDUser(token, callback) {
    call(usersURL(), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }, (error, response) => {
        if(error) {
            callback(error)
        } else if(!JSON.parse(response.content).sdUser) {
            callback(new Error('username and/or password wrong'))
        } else if(JSON.parse(response.content).sdUser) {
            callback(undefined)
        }
    })
}