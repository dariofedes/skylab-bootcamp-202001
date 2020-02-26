const fetch = require('../utils/fetch')
const  __retrieveUserFavs__  = require('./__retrieve-user-favs__')

function searchVehicles(query, token) {
    let userFavs
    return __retrieveUserFavs__(token)
        .then(favs => {
            userFavs = favs
            return fetch('https://skylabcoders.herokuapp.com/api/hotwheels/vehicles?q=' + query)
        })

        .then(response => {
            const results = JSON.parse(response.content)
            if(!results.length) throw new Error('No results')

            results.forEach(vehicle => {
                if(userFavs.includes(vehicle.id)) vehicle.isfav = true
            })

            return results
        })
}

module.exports = searchVehicles