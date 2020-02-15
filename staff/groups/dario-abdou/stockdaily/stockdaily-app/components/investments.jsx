function Investments({ investments, onToDetails }){
    return <section className="investments">
        {investments.length > 0 && <ul className="investments__list">
            {investments.map((investment, index) => <Result key={index} details={investment}  onToDetails={onToDetails}/>)}
        </ul>}
        {!investments.length && <p>You dont have active investments yet.</p>}
    </section>
}