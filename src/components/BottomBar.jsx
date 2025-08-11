import { useState } from "react"
import Button from "./Button"

const BottomBar = ({sortHandler, filter_by, handleSelected, sort_by}) => {

    
    const Selected = {
        Gold: "Gold",
        Silver: "Silver",
        Bronze: "Bronze",
        Percentage: "Percentage",
        Total: "Total",
        Extra: "Extra Award"
    } 

    return (
        <div>

            <input type="radio" id="gold" name="icon" value="Gold" checked={sort_by === Selected.Gold} onChange={(e) => handleSelected(e)}></input>
            <label>Gold</label>
            <input type="radio" id="silver" name="icon" value="Silver" checked={sort_by === Selected.Silver} onChange={(e) => handleSelected(e)}></input>
            <label>Silver</label>
            <input type="radio" id="bronze" name="icon" value="Bronze" checked={sort_by === Selected.Bronze} onChange={(e) => handleSelected(e)}></input>
            <label>Bronze</label>
            <input type="radio" id="total" name="icon" value="Total" checked={sort_by === Selected.Total} onChange={(e) => handleSelected(e)}></input>
            <label>Total</label>
        </div>
    )
}

export default BottomBar