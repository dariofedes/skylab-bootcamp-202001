function Item(props){
    const { id, name, thumbnail, price, isFav } = props

    return `<li class="item">
    <h3 class="item__name">${name}</h3>
    <img class="item__photo" src=${thumbnail} />
    <span class="item__price">${price}$</span>
</li>`
}

module.exports = Item