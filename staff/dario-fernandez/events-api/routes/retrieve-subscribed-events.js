const { retrieveSubscribedEvents } = require('../logic')

module.exports = function(req, res) {
    const { payload: { sub: id } } = req

    try {
        retrieveSubscribedEvents(id)
            .then(subscribedEvents => 
                res
                    .status(200)
                    .json({
                        subscribedEvents
                    })    
            )
            .catch(({ message }) => 
                res 
                    .status(400)
                    .json({
                        error: message
                    })
            )
    } catch({ message }) {
        res 
            .status(400)
            .json({
                error: message
            })
    }
}