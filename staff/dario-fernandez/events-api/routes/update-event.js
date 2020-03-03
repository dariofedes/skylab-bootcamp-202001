const updateEvent = require('../logic')

module.exports = function(req, res) {
    const { body: { updates, params: { eventId } }, payload: { sub: userId } } = req

    try {
        updateEvent(eventId, updates, userId)
            .then(() => 
                res
                    .status(200)
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