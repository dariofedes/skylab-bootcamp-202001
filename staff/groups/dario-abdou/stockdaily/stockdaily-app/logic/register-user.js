/**
 * logic - registerUser
 * @param {object} user - user data, keys: name, surname, username, password
 * @param {function} callback - function 
 */

function registerUser(user, callback) {
    const { name, surname, username, password } = user

    if(!name || typeof name !== 'string') throw new Error('Invalid name')
    if(!surname || typeof surname !== 'string') throw new Error('Invalid surname')
    if(!username || typeof username !== 'string') throw new Error('Invalid username')
    if(!password || typeof password !== 'string') throw new Error('Invalid password')

    call('https://skylabcoders.herokuapp.com/api/v2/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }, (error, response) => {
        if(error) return callback(error)

        if(response.status === 201) {
            callback(undefined)
        } else if (response.status === 409) {
            const { error } = JSON.parse(response.content)

            callback(new Error(error))
        } else {
            callback(new Error('Unknown error'))
        }
    } )
}