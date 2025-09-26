import { useCollapse } from 'react-collapsed'
import { useState, useEffect } from 'react'

const Nested_tournaments = ({tournaments, year}) => {

    const [current_tournaments, setTournaments] = useState([])
    const [current_year, setYear] = useState(0)
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

    useEffect(() => {
        let filtered = [...tournaments].filter((tournament) => (tournament.date.includes(year)))
        setYear(year)
        setTournaments(filtered)
    }, [year, tournaments])

    return (
        <div className="inner_collapsible">
            <div className="header" {...getToggleProps()}>
                {isExpanded ? current_year : current_year}
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    {list_tournaments(current_tournaments)}
                </div>
            </div>
        </div>
    )
}

const list_tournaments = (tournaments) => {

    return (
        <div>
            {tournaments.map((tournament) =>
                <div>
                <label> 
                <input type="radio" key={tournament.id} name="radio_tournament"/> {tournament.date} {tournament.name}
                </label>
                <br/><br/>
                </div>
            )}
            
        </div>)
}

const Calendar = ({ tournaments }) => {

    const [tournament_years, setYears] = useState([])
    const [selected, setSelected] = useState({selected_id: 1})
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

    useEffect(() => {
        let calendar_years = get_years(tournaments)
        setYears(calendar_years)
    }, [tournaments])

    const get_years = (tournaments) => {

        let years = []

        for (const tournament of tournaments) {
            var year = (new Date(tournament.date)).getFullYear()

            if (years.includes(year) === false) {
                years.push(year)
            }
        }
        return years
    }

    const list_years = (tournaments, years) => {

        return (
            <div>
                {years.map((year,index) => 
                <Nested_tournaments key={index} tournaments={tournaments} year={year}/>
                )}
            </div>)
    }

    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                {isExpanded ? "Choose year" : "Start date"}
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    {list_years(tournaments, tournament_years)}
                </div>
            </div>
        </div>
    )
}

export default Calendar