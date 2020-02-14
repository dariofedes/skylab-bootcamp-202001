/**
 * logic - retrieveInvestmentsDetails
 * @param {string} token - User autorization
 * @param {function} callback - function 
 * @returns {object} details - details of the invested companies
 */

function retrieveInvestmentsDetails(token, callback) {
    call(retrieveURL(token), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }, (error, response) => {
        if(error) {
            callback(error)
        } else {
            const { investments } =JSON.parse(response.content)

            if(investments.length > 5) {
                let investedCompanies = []

                for(let i = 0; i < Math.ceil(investments.length / 5); i++) {
                    let query = ''
                    
                    for(let j = (i + 1) * 5; j < investments.length && j < 5; j++) {
                        if(j === 4) {
                            query += investments[j].company
                        } else {
                            query += `${investments[j].company},`
                        }
                    }

                    call(detailsURL(query), undefined, (error, response) => {
                        if(error) {
                            callback(error)
                        } else {
                            const { data } = JSON.parse(response.content)

                            investedCompanies.push(data)

                            if(investedCompanies.length === Math.ceil(investments.length / 5)) {
                                callback(undefined, investedCompanies.flat())
                            }
                        }
                    })
                }
            } else {
                let query = ''

                investments.forEach((element, index) => {
                    if(investments[index + 1]){
                        query += `${element.company},`
                    } else {
                        query += element.company
                    }
                })

                call(detailsURL(query), undefined, (error, response) => {
                    if(error) {
                        callback(error)
                    } else {
                        const { data } = JSON.parse(response.content)

                        callback(undefined, data)
                    }
                })
            }
        }
    })
}