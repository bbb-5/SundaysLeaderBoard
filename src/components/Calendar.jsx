import {useCollapse} from 'react-collapsed'
import Button from "./Button"

const Calendar = ({tournaments}) => {

const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

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

const nested_tournament = (tournaments, year) => {

    return (
    <div className="inner_collapsible">
        <div className="header" {...getToggleProps()}>
            {isExpanded ? year : year}
        </div>
        <div {...getCollapseProps()}>
            <div className="content">
                {list_tournaments(tournaments,year)}
            </div>
        </div>
    </div>    
    )
}

const list_tournaments = (tournaments, year) => {

    let filtered = [...tournaments].filter((tournament) => (tournament.date.includes(year)))

    return (
        <ul>
            {filtered.map((tournament) =>
                <button key={tournament.id}> {tournament.date} {tournament.name}</button>
            )}
        </ul>)
}

return (
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

)

}

// {nested_tournament(tournaments,2025)}

export default Calendar