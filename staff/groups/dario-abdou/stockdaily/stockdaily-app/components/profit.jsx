 function Profit({ profit }){
    const { relativeTotalNetProfit, absoluteTotalNetProfit, totalInvested, total } = profit

     return <article>
            <h6>Your profit:</h6>
            <p>{absoluteTotalNetProfit}</p>
            <p>{relativeTotalNetProfit}%</p>
            <p>Total investment: {totalInvested}</p>
            <p>Total:{total}</p>
        </article>
 }