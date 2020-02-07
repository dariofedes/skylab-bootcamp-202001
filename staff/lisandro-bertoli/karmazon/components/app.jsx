const IT = '🎈🤡'

const { Component } = React

class App extends Component {

    state = { view: undefined, vehicles: undefined, vehicle: undefined, error: undefined, token: undefined, user: undefined }

    componentWillMount() {
        const { token } = sessionStorage

        if (token)
            retrieveUser(token, (error, user) => {
                if (error)
                    return this.setState({ error: error.message + ' ' + IT })

                if (location.search) {
                    const query = location.search.split('=')[1]

                    searchVehicles(query, (error, vehicles) => {
                        if (error)
                            this.setState({ error: error.message + ' ' + IT })

                        this.setState({ view: 'search', user, query, vehicles, error: vehicles.length ? undefined : 'No results ' + IT })

                        if (!vehicles.length)
                            setTimeout(() => {
                                this.setState({ error: undefined })
                            }, 3000)
                    })
                } else
                    this.setState({ view: 'search', user })
            })
        else this.setState({ view: 'login' })
    }


    handleLogin = (username, password) => {
        try {
            authenticateUser(username, password, (error, token) => {
                if (error) {
                    this.setState({ error: error.message })

                    setTimeout(() => {
                        this.setState({ error: undefined })
                    }, 3000)
                } else {

                    retrieveUser(token, (error, user) => { //TODO
                        if (error) {
                            this.setState({ error: error.message })
                            setTimeout(() => {
                                this.setState({ error: undefined })
                            }, 3000)
                        } else {
                            sessionStorage.token = token
                            this.setState({ view: 'search', user })
                        }
                    })
                }
            })

        } catch (error) {
            this.setState({ error: error.message })
            setTimeout(() => {
                this.setState({ error: undefined })
            }, 3000)
        }
    }


    handleToRegister = () => this.setState({ view: 'register' })

    handleRegister = (name, surname, username, password) => {
        try {
            registerUser(name, surname, username, password, (error) => {
                if (error) {
                    this.setState({ error: error.message })
                    setTimeout(() => {
                        this.setState({ error: undefined })
                    }, 3000)

                } else {
                    this.setState({ view: 'login' })
                }
            })

            this.setState({ view: 'login' })
        } catch (error) {
            this.setState({ error: error.message })
            setTimeout(() => {
                this.setState({ error: undefined })
            }, 3000)

        }
    }

    handleToLogin = () => this.setState({ view: 'login' })

    handleSearch = query => {
        const token = sessionStorage.token
        searchVehicles(token, query, (error, vehicles) => {
            if (error) return this.setState({ error: error.message })

            setUrl(query)

            this.setState({ vehicles, vehicle: undefined, error: vehicles.length ? undefined : 'No results' })

            if (error) {
                setTimeout(() => {
                    this.setState({ error: undefined })
                }, 3000)
            }


        })
    }



    handleDetail = id => {
        retrieveVehicle(id, vehicle =>
            this.setState({ vehicle })
        )
    }

    handleBack = () => {
        this.setState({ vehicle: undefined })
    }

    handleLogout = () => {
        sessionStorage.clear();
        setUrl()

        this.setState({ user: undefined, vehicles: undefined, view: 'login' })
    }

    handleHeartClick = id => {

        const token = sessionStorage.token
        toggleFavVehicle(id, token, (error, user) => {

            if (error) {
                this.setState({ error: error.message })
                setTimeout(() => {
                    this.setState({ error: undefined })
                }, 3000)

            } else {
                const query = location.search.split('=')[1]
                searchVehicles(token, query, (error, vehicles) => {
                    if (error) return this.setState({ error: error.message })

                    setUrl(query)

                    this.setState({ vehicles, vehicle: undefined, error: vehicles.length ? undefined : 'No results' })

                    if (error) {
                        setTimeout(() => {
                            this.setState({ error: undefined })
                        }, 3000)
                    }

                })
            }
        })
    }


    render() {
        const { props: { title }, state: { view, vehicle, vehicles, error, user }, handleDetail, handleLogin, handleRegister, handleSearch, handleToLogin, handleToRegister, handleBack, handleHeartClick, handleLogout } = this
        return <main>
            <h1>{title}</h1>

            {view === 'login' && <Login onSubmit={handleLogin} onToRegister={handleToRegister} error={error} />}

            {view === 'register' && <Register onSubmit={handleRegister} onToLogin={handleToLogin} error={error} />}

            {view === 'search' && <Search title="Search" name={user.name} onSubmit={handleSearch} onLogout={handleLogout} />}

            {view === 'search' && vehicles && !vehicle && <Results results={vehicles} onItemClick={handleDetail} onHeartClick={handleHeartClick} />}

            {view === 'search' && vehicle && <Detail vehicle={vehicle} onBack={handleBack} />}
        </main>
    }
}
