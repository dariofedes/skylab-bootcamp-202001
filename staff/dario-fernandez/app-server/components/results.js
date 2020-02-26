const Item = require('./item')

module.exports = function(props){
    const { results: vehicles } = props

    return `<ul class="list">
    ${vehicles.map(vehicle => Item(vehicle)).join('')}
</ul>`
}