function calculateProfit(company, token, callback) {
    const userSub = getSub(token)

    let accumulatedNetProfit

    call(retrieveURL(token), undefined, (error, response) => {
        if(error) {
            callback(error)
        } else {
            const { investments } = JSON.parse(response.content)

            const { positions } = investments[investments.findIndex(element => element.company === company)]

            
        }
    })
}