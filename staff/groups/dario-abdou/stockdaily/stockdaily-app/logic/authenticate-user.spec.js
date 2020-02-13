describe('authenticateUser()', () => {
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

    describe('when user already exist', () => {
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

        it('should succed on right credentials', done => {
            authenticateUser(auxUser, (error, token) => {
                const [header, payload, signature] = token.split('.')

                expect(error).toBeUndefined()
                expect(token).toBeInstanceOf(String)
                expect(header.length).toBeGreaterThan(0)
                expect(payload.length).toBeGreaterThan(0)
                expect(signature.length).toBeGreaterThan(0)

                done()
            })
        })

        it('should fail on wrong username', done => {
            auxUser.username = `${auxUser.username}--wrong`
            authenticateUser(auxUser, (error, token) => {
                expect(token).toBeUndefined()
                expect(error.message).toBe('username and/or password wrong')
                
                done()
            })
        })

        it('should fail on wrong password', done => {
            auxUser.password = `${auxUser.password}--wrong`
            authenticateUser(auxUser, (error, token) => {
                expect(token).toBeUndefined()
                expect(error.message).toBe('username and/or password wrong')
                
                done()
            })
        })

    })

    it('should fail on non existing user', done => {
        authenticateUser(auxUser, (error, token) => {
            expect(token).toBeUndefined()
            expect(error.message).toBe('username and/or password wrong')
            
            done()
        })
    })
})