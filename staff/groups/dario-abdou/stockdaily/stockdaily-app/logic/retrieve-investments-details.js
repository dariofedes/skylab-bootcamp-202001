/**
 * logic - retrieveInvestmentsDetails
 * @param {string} token - User autorization
 * @param {function} callback - function 
 * @returns {object} details - details of the invested companies
 */

function retrieveInvestmentsDetails(token, callback) {
<<<<<<< HEAD
    call(usersURL(token), {
=======
    call(usersURL(), {
>>>>>>> stockdaily-feature/investments-list
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }, (error, response) => {
        if(error) {
            callback(error)
        } else if(response.status !== 200) {
            callback(new Error('Authentication Error. Please, logout and authenticate again.'))
        } else {
            const { investments } = JSON.parse(response.content)

            const data = []

            investments.forEach(element => {
                const { company } = element
                call(detailsURL(company), undefined, (error, response) => {
                    if(error) {
                        callback(error)
                    } else if(JSON.parse(response.content).message) {
                        callback(new Error('Something went wrong, we can not show you your investments at the moment'))
                    } else {
                        const [ details ] = JSON.parse(response.content).data

                        data.push(details)

                        if(data.length === investments.length) {
                            callback(undefined, data)
                        }
                    }
                })
            })
        }
    })
}