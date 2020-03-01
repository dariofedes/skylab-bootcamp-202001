const { subscribeEvent } = require('../logic')

module.exports = function(req, res) {
    const { payload: { sub: userId }, body: { eventId } } = req

    try {
        subscribeEvent(userId, eventId)
            .then(() => 
                res
                    .status(201)
                    .end()
            )
            .catch(({ message }) => 
                res
                    .status(401)
                    .json({
                        error: message
                    })
            ) 
    } catch({ message }) {
        res
            .status(401)
            .json({
                error: message
            })
    }
}