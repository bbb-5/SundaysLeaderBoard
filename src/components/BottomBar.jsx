import { useState } from "react"
import Button from "./Button"

const BottomBar = ({sortHandler, filter_by, handleSelected, sort_by}) => {

    
    const Selected = {
        Gold: "Gold",
        Silver: "Silver",
        Bronze: "Bronze",
        Percentage: "Percentage",
        Total: "Over all",
        Extra: "Extra Award"
    } 

    return (
        <div>

            <input type="radio" id="gold" name="icon" value="Gold" checked={sort_by === Selected.Gold} onChange={(e) => handleSelected(e)}></input>
            <label>Gold</label>

            <input type="radio" id="silver" name="icon" value="Silver" checked={sort_by === Selected.Silver} onChange={(e) => handleSelected(e)}></input>
            <label>Silver</label>

        </div>
    )
}

export default BottomBar