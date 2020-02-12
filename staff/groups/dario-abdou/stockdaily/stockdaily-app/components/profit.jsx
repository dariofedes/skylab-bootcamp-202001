 function Profit({ profit }){
    const { relativeTotalNetProfit, absoluteTotalNetProfit, totalInvested, total } = profit

     return <article className="profit">
            <h6 className="profit__title">Your profit:</h6>
            {absoluteTotalNetProfit < 0 && <p className="profit__absolute profit__absolute--down">{absoluteTotalNetProfit}$</p>}{absoluteTotalNetProfit > 0 && <p className="profit__absolute profit__absolute--up">+{absoluteTotalNetProfit}$</p>}{absoluteTotalNetProfit == 0 && <p className="profit__absolute">{absoluteTotalNetProfit}$</p>}
            {absoluteTotalNetProfit < 0 && <p className="profit__relative profit__relative--down">{relativeTotalNetProfit}$</p>}{relativeTotalNetProfit > 0 && <p className="profit__relative profit__relative--up">+{relativeTotalNetProfit}%</p>}{relativeTotalNetProfit == 0 && <p className="profit__relative">{relativeTotalNetProfit}$</p>}
            <p className="profit__info">Total:{total}</p>
            <p className="profit__info">Total invested: {totalInvested}</p>
        </article>
 }