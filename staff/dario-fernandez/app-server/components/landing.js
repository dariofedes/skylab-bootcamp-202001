const Results = require('./results')

function Landing(props = {}) {
    const { name, surname, username } = props

    return `<section class="search">
    ${name ? `<span class="search__user"><p class="search__user-name">${name} ${surname} (${username}) <i class="fas fa-user search__user-avatar"></i></p></span>` : `<a href="/login">Login</a><p> or </p><a href="/register">register</a>`}
    <form class="search__form" action="/search" method="GET">
        <input class="search__query" type="text" name="query" placeholder="Search..." />
        <button class="search__submit" type="submit"><i className="fas fa-search"></i></button>
    </form>`


}

module.exports = Landing