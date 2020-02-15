/**
 * logic - retrieveDetails
 * @param {string} symbol - the id symbol of a company
 * @param {function} callback - function 
 * @returns {object} details 
 */

function retrieveDetails(symbol, callback) {

    call(detailsURL(symbol), undefined, (error, response) => {
        if(error) {
            callback(error)
        } else if(!JSON.parse(response.content).data) {
            callback(new Error('No stocks found'))
        } else {
            const { data } = JSON.parse(response.content)
            
            const [ details ] = data

            callback(undefined, details)
        }
    })
}