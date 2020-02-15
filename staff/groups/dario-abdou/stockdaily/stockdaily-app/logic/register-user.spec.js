describe('registerUser()', () => {
    let user = {}
    let auxUser = {}

    beforeEach(() => {
        user.name = `name-${Math.random()}`
        user.surname = `surname-${Math.random()}`
        user.username = `username-${Math.random()}`
        user.password = `password-${Math.random()}`
        auxUser.username = user.username
        auxUser.password = user.password
    })

    it('Should succed on new user', done => {
        registerUser(user, (error, response) => {
            expect(error).toBeUndefined()
            expect(response).toBeUndefined()
            done()
        })
    })

    describe('on existing user', () => {
        beforeEach(done => {
            call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            }, error => {
                if (error) return done(error)

                done()
            })
        })

        it('Should fail', done => {
            registerUser(user, (error) => {
                expect(error).toBeDefined()
                expect(error.message).toBe( `user with username "${user.username}" already exists`)
                done()
            })
        })
    })

    // afterEach(done => {
    //     call(`https://skylabcoders.herokuapp.com/api/v2/users/auth`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(auxUser)
    //     }, (error, response) => {
    //         if (error) return done(error)

    //         const { error: _error, token } = JSON.parse(response.content)

    //         if (_error) return done(new Error(_error))

    //         call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`
    //             },
    //             body: JSON.stringify(auxUser.password)
    //         }, (error, response) => {
    //             if (error) return done(error)

    //             if (response.content) {
    //                 const { error } = JSON.parse(response.content)

    //                 if (error) return done(new Error(error))
    //             }

    //             done()
    //         })
    //     })
    // })
})