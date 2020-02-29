const { database } = require('../data')

module.exports = function() {
    const events = database.collection('events')

    const lastEvents = []

    const cursor = events.find().sort( { date: -1 } );
    
    return (function pushEvents() {
        return cursor
            .hasNext()
            .then(hasNext => hasNext && cursor.next())
            .then(event => event && lastEvents.push(event) && pushEvents())
            .then(() => lastEvents)
    })();
}