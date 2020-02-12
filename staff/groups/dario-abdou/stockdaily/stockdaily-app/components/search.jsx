function Search({ onSearchSubmit }) {
    return <form className="search" onSubmit={event => {
        event.preventDefault()

        const query = event.target.query.value

        onSearchSubmit(query)
    }}>
            <input className="search__query" type="text" name="query" />
            <button className="search__submit" type="submit"><i className="fas fa-search search__icon"></i></button>
        </form>
}