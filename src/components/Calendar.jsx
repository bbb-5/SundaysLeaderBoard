import { useCollapse } from 'react-collapsed'
import { useState, useEffect } from 'react'

const Nested_tournaments = ({ tournaments, year,onDatesSelected, onTournamentSelected, selected }) => {

    const [current_tournaments, setTournaments] = useState([])
    const [current_year, setYear] = useState(0)
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

    const Filters = {
        Indoor: "Indoor",
        Beach: "Beach",
        Both: "Both"
    }

    useEffect(() => {

        let filtered = [...tournaments].filter((tournament) => (tournament.date.includes(year)))

        setYear(year)
        setTournaments(filtered)

    }, [year, tournaments])

    const handleDate = (e) => {
        onDatesSelected(e.target.attributes.date.value)
        console.log("date at end: ", e.target.attributes.date.value)
        onTournamentSelected(e.target.attributes.id.value, e.target.attributes.date.value)
        console.log("clicked: ",e.target.attributes.id.value, e.target.attributes.date.value)
    }

    return (
        <div className="inner_collapsible">
            <div className="header" {...getToggleProps()}>
                {isExpanded ? current_year : current_year}
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    <div>
                        {current_tournaments.map((tournament) =>
                            <div key={tournament.id}>
                                <label>
                                    <input type="radio" checked={selected.id == tournament.id} id={tournament.id} date={tournament.date}
                                        onChange={(e) => handleDate(e)} tournament={tournament}/> {tournament.date} {tournament.name}
                                </label>
                                <br /><br />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

const Calendar = ({ tournaments, default_idx, onDatesSelected, filter }) => {

    const [tournament_years, setYears] = useState([])
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()
    const [selected_tournament, setSelected] = useState({id: 1,date: "2024-02-25T09:00:00Z"})

    useEffect(() => {
        let calendar_years = get_years(tournaments)
        setYears(calendar_years)

        if (tournaments.length == 0) return

        handleTournament(tournaments[default_idx].id, tournaments[default_idx].date)
        console.log(tournaments[default_idx])
        onDatesSelected(tournaments[default_idx].date)

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

    const handleTournament = (id, date) => {
        setSelected({id: id, date: date})
    }

    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                {isExpanded ? "Choose year" : (selected_tournament ? selected_tournament.date : "asd")}
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    <div>
                        {tournament_years.map((year, index) =>
                            <Nested_tournaments key={index} tournaments={tournaments} year={year} selected={selected_tournament}
                                filter={filter} onDatesSelected={onDatesSelected} onTournamentSelected={handleTournament}></Nested_tournaments>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar