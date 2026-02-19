const BottomBar = ({ handleSelected, sort_by, filter_by }) => {

    const Selected = {
        Gold: "Gold",
        Silver: "Silver",
        Bronze: "Bronze",
        Percentage: "Percentage",
        Total: "Total",
        Extra: "Extra",
        Default: "Default"
    }

    const Filters = {
        Indoor: "Indoor",
        Beach: "Beach",
        Both: "Both"
    }

    if (filter_by === Filters.Indoor) {
        return (
            <div>
                <label>
                    <input type="radio" className="sorter" id="gold" name="icon" value="Gold" checked={sort_by === Selected.Gold} onChange={(e) => handleSelected(e)}></input>
                    <img src="icons/ICONS2_Gold.svg" width={55} height={55} />
                </label>

                <label>
                    <input type="radio" className="sorter" id="percentage" name="icon" value="Percentage" checked={sort_by === Selected.Percentage} onChange={(e) => handleSelected(e)}></input>
                    <img src="icons/ICONS2_Winning percentage (WP).svg" width={55} height={55} />
                </label>

                <label>
                    <input type="radio" className="sorter" id="total" name="icon" value="Total" checked={sort_by === Selected.Total} onChange={(e) => handleSelected(e)}></input>
                    <img src="icons/ICONS2_Total amount of medals.svg" width={55} height={55} />
                </label>

                <label>
                    <input type="radio" className="sorter" id="extra" name="icon" value="Extra" checked={sort_by === Selected.Extra} onChange={(e) => handleSelected(e)}></input>
                    <img src="icons/ICONS2_Extra voting topic.svg" width={55} height={55} />
                </label>

                <label>
                    <input type="radio" className="sorter" id="default" name="icon" value="Default" checked={sort_by === Selected.Default} onChange={(e) => handleSelected(e)}></input>
                    <img src="icons/ICONS2_Refresh.svg" width={55} height={55} />
                </label>

            </div>
        )
    }

    return (
        <div>
            <label>
                <input type="radio" className="sorter" id="gold" name="icon" value="Gold" checked={sort_by === Selected.Gold} onChange={(e) => handleSelected(e)}></input>
                <img src="icons/ICONS2_Gold.svg" width={55} height={55} />
            </label>
            
            <label>
                <input type="radio" className="sorter" id="silver" name="icon" value="Silver" checked={sort_by === Selected.Silver} onChange={(e) => handleSelected(e)}></input>
                <img src="icons/ICONS2_Silver.svg" width={55} height={55} />
            </label>

            <label>
                <input type="radio" className="sorter" id="bronze" name="icon" value="Bronze" checked={sort_by === Selected.Bronze} onChange={(e) => handleSelected(e)}></input>
                <img src="icons/ICONS2_Bronze.svg" width={55} height={55} />
            </label>

            <label>
                <input type="radio" className="sorter" id="percentage" name="icon" value="Percentage" checked={sort_by === Selected.Percentage} onChange={(e) => handleSelected(e)}></input>
                <img src="icons/ICONS2_Winning percentage (WP).svg" width={55} height={55} />
            </label>

            <label>
                <input type="radio" className="sorter" id="total" name="icon" value="Total" checked={sort_by === Selected.Total} onChange={(e) => handleSelected(e)}></input>
                <img src="icons/ICONS2_Total amount of medals.svg" width={55} height={55} />
            </label>

            <label>
                <input type="radio" className="sorter" id="extra" name="icon" value="Extra" checked={sort_by === Selected.Extra} onChange={(e) => handleSelected(e)}></input>
                <img src="icons/ICONS2_Extra voting topic.svg" width={55} height={55} />
            </label>

            <label>
                <input type="radio" className="sorter" id="default" name="icon" value="Default" checked={sort_by === Selected.Default} onChange={(e) => handleSelected(e)}></input>
                <img src="icons/ICONS2_Refresh.svg" width={55} height={55} />
            </label>

        </div>
    )
}

export default BottomBar