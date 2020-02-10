function Search({ onSearchSubmit }) {
    return <form onSubmit={event => {
        event.preventDefault()

        const query = event.target.query.value

        onSearchSubmit(query)
    }}>
            <input type="text" name="query" />
            <button type="submit">Search</button>
        </form>
}