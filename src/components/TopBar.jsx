import {useCollapse} from 'react-collapsed'
import Button from "./Button"

const TopBar = ({reverseHandler, filterHandler, filter_by, tournaments}) => {

    const Filters = {
        Indoor: "Indoor",
        Beach: "Beach",
        Both: "Both"
    }

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

    const formatDate = (string) => {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }

    const list_years = (tournaments) => {

        let years = []
        
        for (const tournament of tournaments) {
            var year = (new Date(tournament.date)).getFullYear()

            if (years.includes(year) === false) {
                years.push(year)
            }
        }
        
        return (
            <ul>
                {years.map((year, index) =>
                    <li key={index}>{year}</li>
                )}
            </ul>)
    }

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
            <div className="collapsible">
                <div className="header" {...getToggleProps()}>
                    {isExpanded ? "Choose year" : "Start date"}
                </div>
                <div {...getCollapseProps()}>
                    <div className="content">
                         {list_years(tournaments)}
                    </div>
                </div>
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