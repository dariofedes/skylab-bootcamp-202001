describe('setNewPosition()', () => {
    let user = {}
    let auxUser = {}
    let userToken

    beforeEach(() => {
        user.name = `name-${Math.random()}`
        user.surname = `surname-${Math.random()}`
        user.username = `username-${Math.random()}`
        user.password = `password-${Math.random()}`
        auxUser.username = user.username
        auxUser.password = user.password
    })

    describe('on valid position', () => {
        beforeEach(done => {
            call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            }, error => {
                if (error) {
                    return done(error)
                } else {
                    call(`https://skylabcoders.herokuapp.com/api/v2/users/auth`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(auxUser)
                    }, (error, response) => {
                        if(error) {
                            return done(error)
                        } else {
                            const { token } = JSON.parse(response.content)
                            userToken = token

                            call('https://skylabcoders.herokuapp.com/api/v2/users', {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                }, body: JSON.stringify({investments: []})
                            }, (error, response) => {
                                if(error) {
                                    return done(error)
                                } else {
                                    done()
                                }
                            })
                        }
                    })
                }
            })
        })

        it('should set a new position', done => {
            setNewPosition({ date: '2020-01-13', amount: '1000', symbol: 'AAPL' }, userToken, (error, response) => {
                expect(error).toBeUndefined()
                expect(response).toBe(204)
                
                done()
            })
        })

        fit('Should fail on non valid date', done => {
            setNewPosition({ date: '2020-13-13', amount: '1000', symbol: 'AAPL' }, userToken, (error, response) => {
                expect(response).toBeUndefined()
                expect(error.message).toBe('No price data for this date, please select a defferent date.')
                done()
            })
        })
    })
})