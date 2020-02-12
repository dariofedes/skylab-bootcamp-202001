const { Component } = React

class App extends Component {
    state = { view: 'login', companies: undefined, company: undefined, userName: undefined, investments: undefined, logged: false }

    componentWillMount() {
        const { token } = sessionStorage
        if(token) {
            retrieveUser(token, (error, userInfo) => {
                if(error) {
                    this.setState({ view: 'login', logged: false })
                } else {
                    const { name, surname } = userInfo

                    this.setState({ userName: { name, surname }, view: 'search', logged: true })

                }
            })
        }       
    }

    handleLogin = credentials =>  {
            authenticateUser(credentials, (error, token) => {
                if(error) {
                    //TODO Handle Error
                } else {
                    sessionStorage.token = token
                    this.setState({ view: 'search', logged: true })
                }    
            })
    }

    handleOnToRegister = () => {
        this.setState({ view: 'register' })
    }

    handleRegister = ({ name, surname, username, password }) => {

            registerUser({ name, surname, username, password, investments: [] }, error => {
                if(error) {
                    //TODO Handle Error
                } else {
                    this.setState({ view: 'login' })
                }
            })
    }

    handleOnToLogin = () => {
        this.setState({ view: 'login' })
    }


    handleSearchSubmit = (query) => {
        const { token } = sessionStorage

        searchCompanies(query, token, (error, companies) => {
            if(error) {
                //TODO Handle Error
            } else {
                this.setState({ companies, company: undefined, investments: undefined})
            }
        })
    }

    handleOnToDetails = symbol => {
        this.setState({ company: symbol, companies: undefined, investments: undefined })
    }

    handleOnToInvestments = () => {
        const{ token } = sessionStorage

        retrieveInvestmentsDetails(token, (error, investments) => {
            this.setState({ investments, companies: undefined, company: undefined })
        })
    }

    handleOnLogout = () => {
        sessionStorage.clear()
        this.setState({view: 'login', logged: false})
    }

    render() {
        const { state: {view, companies, company, profit, investments, logged}, handleSearchSubmit, handleOnToDetails, handleOnToLogin, handleOnToRegister, handleLogin, handleRegister, handleOnPositionSubmit, handleOnToInvestments, handleOnLogout, handleOnToAccount }= this

        return <main className="app">

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
