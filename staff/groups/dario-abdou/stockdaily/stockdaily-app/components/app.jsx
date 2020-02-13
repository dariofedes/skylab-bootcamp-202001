const { Component } = React

class App extends Component {
    state = { view: undefined, companies: undefined, company: undefined, userName: undefined, investments: undefined, logged: false, error: undefined }

    componentWillMount() {
        const { token } = sessionStorage
        if(token) {
            retrieveUser(token, (error, userInfo) => {
                if(error) {
                    const { protocol, host, pathname } = location

                    const url = `${protocol}//${host}/${pathname}#login`

                    history.pushState({ path: url }, '', url)

                    sessionStorage.clear()
                    this.setState({ view: 'login', logged: false })
                } else {
                    let { name, surname } = userInfo
                    this.setState({ userName: { name, surname }, logged: true  })
                    if(location.search) {
                        this.setState({ view: 'search' })
                        let query = location.search.split('=')[1]
                        
                        this.handleSearchSubmit(query)
                    } else if(location.href.split('#')[1] === 'login' || location.href.split('#')[1] === 'signup') {
                        this.setState({ view: location.href.split('#')[1], logged: false })
                        sessionStorage.clear()
                    } else if(location.href.split('#')[1] === 'investments'){
                        this.handleOnToInvestments()
                        this.setState({ view: 'search' })
                    } else if(!location.href.split('#')[1]) {
                        this.setState({ view: 'search' })
                    } else if(location.href.split('#')[1].split('/')[0] === 'stock') {
                        this.handleOnToDetails(location.href.split('#')[1].split('/')[1])
                    } else {
                        this.showFeedback('Invalid url')
                    }
                }
            })
        } else {
            const { protocol, host, pathname } = location

            const url = `${protocol}//${host}${pathname}#login`

            history.pushState({ path: url }, '', url)

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
            authenticateUser(credentials, (error, token) => {
                if(error) {
                   this.showFeedback(error)
                } else {
                    const { protocol, host, pathname } = location

                    const url = `${protocol}//${host}${pathname}`

                    history.pushState({ path: url }, '', url)

                    sessionStorage.token = token
                    this.setState({ view: 'search', logged: true })
                }    
            })
    }

    handleOnToRegister = () => {
        const { protocol, host, pathname } = location

        const url = `${protocol}//${host}${pathname}#signup`

        history.pushState({ path: url }, '', url)

        this.setState({ view: 'register' })
    }

    handleRegister = ({ name, surname, username, password }) => {

            registerUser({ name, surname, username, password, investments: [] }, error => {
                if(error) {
                    this.showFeedback(error)
                } else {
                    const { protocol, host, pathname } = location

                    const url = `${protocol}//${host}/${pathname}#login`

                    history.pushState({ path: url }, '', url)
                    
                    this.setState({ view: 'login' })
                }
            })
    }

    handleOnToLogin = () => {
        const { protocol, host, pathname } = location

        const url = `${protocol}//${host}${pathname}#login`

        history.pushState({ path: url }, '', url)

        this.setState({ view: 'login' })
    }


    handleSearchSubmit = (query) => {
        const { token } = sessionStorage

        searchCompanies(query, token, (error, companies) => {
            if(error) {
                this.showFeedback(error)
            } else {
                const { protocol, host, pathname } = location

                const url = `${protocol}//${host}${pathname}?q=${query}`

                history.pushState({ path: url }, '', url)


                this.setState({ companies, company: undefined, investments: undefined})
            }
        })
    }

    handleOnToDetails = symbol => {
        const { protocol, host, pathname } = location

        const url = `${protocol}//${host}${pathname}#stock/${symbol}`

        history.pushState({ path: url }, '', url)
        this.setState({view: 'search', company: symbol, companies: undefined, investments: undefined })
    }

    handleOnToInvestments = () => {
        const{ token } = sessionStorage

        const { protocol, host, pathname } = location

        const url = `${protocol}//${host}${pathname}#investments`

        history.pushState({ path: url }, '', url)

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

        const { protocol, host, pathname } = location

        const url = `${protocol}//${host}${pathname}#login`

        history.pushState({ path: url }, '', url)
        this.setState({view: 'login', logged: false})
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
