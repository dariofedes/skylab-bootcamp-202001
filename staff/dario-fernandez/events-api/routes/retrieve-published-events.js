const { retrievePublishedEvents } = require('../logic')

module.exports = function(req, res) {
    const { payload: { sub: id } } = req

    try {
        retrievePublishedEvents(id)
            .then(publishedEvents => 
                res
                    .status(200)
                    .json({
                        publishedEvents
                    })
            )
            .catch(({ message }) => 
                res
                    .status(400)
                    .json({
                        error: message
                    })
            )
    } catch ({ message }) {
        res
            .status(400)
            .json({
                error: message
            })
    }
}