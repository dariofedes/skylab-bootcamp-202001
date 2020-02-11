function Investments({ investments, onToDetails }){
    return <section>
        {investments.length && <ul>
            {investments.map((investment, index) => <Result key={index} details={investment}  onToDetails={onToDetails}/>)}
        </ul>}
        {!investments.length && <p>You dont have active investments yet.</p>}
    </section>
}