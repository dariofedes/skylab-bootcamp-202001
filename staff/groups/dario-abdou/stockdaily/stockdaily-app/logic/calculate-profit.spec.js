describe('calculateProfit()', () => {
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

    describe('on existing positions', () => {
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
                                }, body: JSON.stringify({investments: [{company: 'AAPL', positions: [{date: '2020-01-13', amount: '1000'}]}]})
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

        it('should calculate the profit', done => {
            calculateProfit('AAPL', userToken, (error, profit) => {
                    expect(profit).toBeDefined()
                    expect(profit).toBeInstanceOf(Object)
                    expect(profit.totalInvested).toBe(1000)
                    expect(profit.absoluteTotalNetProfit).toBeDefined()
                    expect(profit.total).toBeDefined()
                    expect(profit.relativeTotalNetProfit).toBeDefined()

                    done()
            })
        })
    })
})