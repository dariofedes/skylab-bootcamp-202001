const { createEvent, __pushPublishedEvent__ } = require('../logic')

module.exports = function(req, res) {
    const { payload: { sub: id }, body: { title, description, location, date } } = req

    try {
        createEvent(id, title, description, location, new Date(date))
            .then(eventId => __pushPublishedEvent__(eventId, id))
            .then(() => res.status(201).end())
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