function Home(props = {}) {
    const {  name, surname, username  } = props

    return `<section class="search">
    <span class="search__user"><p class="search__user-name">${name} ${surname} (${username}) <i class="fas fa-user search__user-avatar"></i></p></span>
    <form class="search__form" action="/search" method="POST">
        <input class="search__query" type="text" name="query" placeholder="Search..." />
        <button class="search__submit" type="submit"><i className="fas fa-search"></i></button>
    </form>
</section>`
}

module.exports = Home