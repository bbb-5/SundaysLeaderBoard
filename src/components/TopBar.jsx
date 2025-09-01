import {useCollapse} from 'react-collapsed'
import Button from "./Button"

const TopBar = ({reverseHandler, filterHandler, filter_by, tournaments}) => {

    const Filters = {
        Indoor: "Indoor",
        Beach: "Beach",
        Both: "Both"
    }

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()


    const list_tournaments = (tournaments, year) => {
        return (
            <ul>
                {tournaments.map((tournament) =>
                    <button key={tournament.id}> {tournament.date} {tournament.name}</button>
                )}
            </ul>)
    }

    return (
        <div>
            <div>
            </div>
            <input type="radio" id="indoor" name="tournament_type" value="Indoor" checked={filter_by === "Indoor"} onChange={(e) => filterHandler(e)}></input>
            <label>Indoor</label>
            <input type="radio" id="beach" name="tournament_type" value="Beach" checked={filter_by === "Beach"} onChange={(e) => filterHandler(e)}></input>
            <label>Beach</label>
            <input type="radio" id="both" name="tournament_type" value="Both" checked={filter_by === "Both"} onChange={(e) => filterHandler(e)}></input>
            <label>Both</label>
            <Button onClick={reverseHandler} label='Reverse'> </Button>
        </div>
    )
}

export default TopBar