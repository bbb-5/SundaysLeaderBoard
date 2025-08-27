import { useState } from "react"
import Button from "./Button"

const BottomBar = ({handleSelected, sort_by}) => {

    
    const Selected = {
        Gold: "Gold",
        Silver: "Silver",
        Bronze: "Bronze",
        Percentage: "Percentage",
        Total: "Total",
        Extra: "Extra",
        Default: "Default"
    } 

    return (
        <div>

            <input type="radio" id="gold" name="icon" value="Gold" checked={sort_by === Selected.Gold} onChange={(e) => handleSelected(e)}></input>
            <label>Gold</label>
            <input type="radio" id="silver" name="icon" value="Silver" checked={sort_by === Selected.Silver} onChange={(e) => handleSelected(e)}></input>
            <label>Silver</label>
            <input type="radio" id="bronze" name="icon" value="Bronze" checked={sort_by === Selected.Bronze} onChange={(e) => handleSelected(e)}></input>
            <label>Bronze</label>
            <input type="radio" id="percentage" name="icon" value="Percentage" checked={sort_by === Selected.Percentage} onChange={(e) => handleSelected(e)}></input>
            <label>Percentage</label>
            <input type="radio" id="total" name="icon" value="Total" checked={sort_by === Selected.Total} onChange={(e) => handleSelected(e)}></input>
            <label>Total</label>
            <input type="radio" id="extra" name="icon" value="Extra" checked={sort_by === Selected.Extra} onChange={(e) => handleSelected(e)}></input>
            <label>Extra Award</label>
            <input type="radio" id="default" name="icon" value="Default" checked={sort_by === Selected.Default} onChange={(e) => handleSelected(e)}></input>
            <label>Default</label>
            
        </div>
    )
}

export default BottomBar