const { retrieveLastEvents } = require('../logic')

module.exports = function(req, res) {
    try {
        retrieveLastEvents() 
            .then(lastEvents => 
                res
                    .status(200)
                    .json({lastEvents})    
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