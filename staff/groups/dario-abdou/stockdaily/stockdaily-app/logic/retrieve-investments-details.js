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
                callback(new Error('You exceded the maximun number of investments'))
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