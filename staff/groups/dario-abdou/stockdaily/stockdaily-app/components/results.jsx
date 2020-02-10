function Results({ results, onToDetails }) {
    return <ul className="list">
        {results.map((result, index) => <Result key={index} details={result}  onToDetails={onToDetails}/>)}
    </ul>
}