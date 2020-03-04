function register(user) {
    const { username } = user
    const userExist = users.some(function(element) {
        return username === element.username
    })

    if(userExist) {
        throw new Error('Username in use')
    } else {
        users.push(user)
    }
}