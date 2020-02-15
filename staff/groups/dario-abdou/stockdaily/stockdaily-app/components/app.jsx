const { Component } = React

class App extends Component {
    state = { view: undefined, companies: undefined, company: undefined, userName: undefined, investments: undefined, logged: false, error: undefined }
    
    componentWillMount() {
        console.log('Feliz San Valentín, cielo 👩‍❤️‍💋‍👨')
        const { token } = sessionStorage
        if(token) {
            retrieveUser(token, (error, userInfo) => {
                if(error) {
                    address.hash = 'login'

                    sessionStorage.clear()
                    this.setState({ view: 'login', logged: false })
                } else {
                    let { name, surname } = userInfo
                    this.setState({ userName: { name, surname }, logged: true  })
                    if(address.search.q) {
                        let { q: query } = address.search
                        this.setState({ view: 'search' })                        
                        this.handleSearchSubmit(query)
                    } else if(address.hash === 'login' || address.hash === 'signup') {
                        this.setState({ view: address.hash, logged: false })
                        sessionStorage.clear()
                    } else if(address.hash === 'investments'){
                        this.handleOnToInvestments()
                        this.setState({ view: 'search' })
                    } else if(!address.hash) {
                        address.clear()
                        this.setState({ view: 'search' })
                    } else if(address.hash.startsWith('stock/')) {
                        let [ , id ] = address.hash.split('/')[1]
                        this.handleOnToDetails(id)
                    } else {
                        this.showFeedback('Invalid url')
                    }
                }
            })
        } else {
            address.hash = 'login'

            this.setState({ view: 'login', logged: false })
        }      
    }

    showFeedback = error =>{
        this.setState({ error: error.message })

        setTimeout(() => {
            this.setState({ error: undefined })
        }, 3000)
    }

    handleLogin = credentials =>  {
           try {
                authenticateUser(credentials, (error, token) => {
                    if(error) {
                        this.showFeedback(error)
                    } else {
                        sessionStorage.token = token
                        isSDUser(sessionStorage.token, error => {
                            if(error) {
                                this.showFeedback(error)
                            } else {
                                this.setState({ view: 'search', logged: true })

                            }
                        })
                    }    
                })
           } catch(error) {
               this.showFeedback(error)
           }
    }

    handleOnToRegister = () => {
        address.hash = 'signup'

        this.setState({ view: 'register' })
    }

    handleRegister = ({ name, surname, username, password }) => {
        try {
            registerUser({ name, surname, username, password, investments: [], sdUser: true }, error => {
                if(error) {
                    this.showFeedback(error)
                } else {
                    address.hash = 'login'
                    
                    this.setState({ view: 'login' })
                }
            })
        } catch(error) {
            this.showFeedback(error)
        }
    }

    handleOnToLogin = () => {
        address.hash = 'login'

        this.setState({ view: 'login' })
    }


    handleSearchSubmit = (query) => {
        const { token } = sessionStorage

        searchCompanies(query, token, (error, companies) => {
            if(error) {
                this.showFeedback(error)
            } else {
                address.search = { q: query }

                this.setState({ companies, company: undefined, investments: undefined})
            }
        })
    }

    handleOnToDetails = symbol => {

        address.hash = `stock/${symbol}`

        this.setState({view: 'search', company: symbol, companies: undefined, investments: undefined })
    }

    handleOnToInvestments = () => {
        const{ token } = sessionStorage


        address.hash = 'investments'

        retrieveInvestmentsDetails(token, (error, investments) => {
            if(error) {
                this.showFeedback(error)
            } else {
                this.setState({ investments, companies: undefined, company: undefined })
            }
        })
    }

    handleOnLogout = () => {
        sessionStorage.clear()
        const{ token } = sessionStorage

        address.hash = 'login'
        
        this.setState({view: 'login', logged: false, companies: undefined, company: undefined, investments: undefined})
    }

    render() {
        const { state: {view, companies, company, profit, investments, logged, error}, handleSearchSubmit, handleOnToDetails, handleOnToLogin, handleOnToRegister, handleLogin, handleRegister, handleOnPositionSubmit, handleOnToInvestments, handleOnLogout, handleOnToAccount }= this

        return <main className="app">
                
                {error && <Feedback error={error} />}

                <Header logged={logged} title="stockDaily" onToInvestments={handleOnToInvestments} onToLogin={handleOnToLogin} onToRegister={handleOnToRegister} onLogout={handleOnLogout} onToAccount={handleOnToAccount} />

                {view === 'login' && <Login onSubmit={handleLogin} onToRegister={handleOnToRegister} />}
                
                {view === 'register' && <Register onSubmit={handleRegister} onToLogin={handleOnToLogin} />}

                {view === 'search' && <Search onSearchSubmit={handleSearchSubmit} />}

                {view === 'search' && companies && <Results results={companies} onToDetails={handleOnToDetails} />}
                
                {view === 'search' && company && <Details symbol={company} />}

                {view === 'search' && investments && <Investments onToDetails={handleOnToDetails} investments={investments} />}
           
            </main>
    }
}
