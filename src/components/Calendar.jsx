import { useCollapse } from 'react-collapsed'
import { useState, useEffect } from 'react'

const Nested_tournaments = ({tournaments, year, header}) => {

    const [current_tournaments, setTournaments] = useState([])
    const [current_year, setYear] = useState(0)
    const [selected_tournament, setSelected] = useState({selected_id: 1})
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()


    const Calendar = {
      Start: "Start date",
      End: "End date"
    }

    useEffect(() => {
        let filtered = [...tournaments].filter((tournament) => (tournament.date.includes(year)))
        setYear(year)
        setTournaments(filtered)

        if(header === Calendar.Start){
            setSelected({selected_id: 1})
        } else {
            setSelected({selected_id: 17})
        }

    }, [year, tournaments])

    const handleSelected = (e) => { 
        setSelected({selected_id: e.target.id})
        console.log("selected tournament: ",e.target.id)
    }

    const list_tournaments = () => {

        return (
            <div>
                {current_tournaments.map((tournament) =>
                    <div key={tournament.id}>
                    <label> 
                    <input type="radio" id={tournament.id} name="radio_tournament" checked={selected_tournament.selected_id == tournament.id} onChange={(e) => handleSelected(e)}/> {tournament.date} {tournament.name}
                    </label>
                    <br/><br/>
                    </div>
                )}
                
            </div>)
    }

    return (
        <div className="inner_collapsible">
            <div className="header" {...getToggleProps()}>
                {isExpanded ? current_year : current_year}
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    {list_tournaments()}
                </div>
            </div>
        </div>
    )
}

const Calendar = ({ tournaments, header }) => {

    const [tournament_years, setYears] = useState([])
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

    const list_years = (tournaments, years, header) => {

        return (
            <div>
                {years.map((year,index) => 
                <Nested_tournaments key={index} tournaments={tournaments} year={year} header={header}/>
                )}
            </div>)
    }

    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                {isExpanded ? "Choose year" : header}
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    {list_years(tournaments, tournament_years, header)}
                </div>
            </div>
        </div>
    )
}

export default Calendar