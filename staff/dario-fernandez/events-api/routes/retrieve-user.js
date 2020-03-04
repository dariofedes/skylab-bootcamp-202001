const { retrieveUser } = require('../logic')

module.exports = function(req, res) {
    const { payload: { sub: id } } = req

    try {
        debugger
        retrieveUser(id)
            .then(userInfo =>
                res.status(200).json(userInfo)
            )
            .catch(({message}) => {
                res
                    .status(401)
                    .json({
                        error: message
                    })
            })

    } catch({message}) {
        res
            .status(400)
            .json({
                error: message
            })
    }
}