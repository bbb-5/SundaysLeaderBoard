import { useCollapse } from 'react-collapsed'
import { useState, useEffect } from 'react'

const Nested_tournaments = ({tournaments, year, header, onDatesSelected, onTournamentSelected}) => {

    const [current_tournaments, setTournaments] = useState([])
    const [current_year, setYear] = useState(0)
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

    const Calendar = {
      Start: "Start date",
      End: "End date"
    }

  const Filters = {
    Indoor: "Indoor",
    Beach: "Beach",
    Both: "Both"
  }

    useEffect(() => {
        
        let filtered = [...tournaments].filter((tournament) => (tournament.date.includes(year)))

        setYear(year)
        setTournaments(filtered)
     
        /*
        if(header === Calendar.Start){
            onTournamentSelected({current_id: tournaments[0].id})
        } else {
           onTournamentSelected({current_id: tournaments[tournaments.length-1].id})
        }*/

    }, [year, tournaments])

    const handleDate = (e) => {


      switch(header){

        case Calendar.Start: 
            onDatesSelected(header, e.target.attributes.date.value)
            break

        default: 
            onDatesSelected(header,  e.target.attributes.date.value)
            break
      }

      console.log("date at end: ",  e.target.attributes.date.value)

       onTournamentSelected(e.target.id)
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
                        <input type="radio" id={tournament.id} name={header} date={tournament.date}  
                            onChange={(e) => handleDate(e)}/> {tournament.date} {tournament.name}
                        </label>
                        <br/><br/>
                        </div>
                )}
                  </div>
                </div>
            </div>
        </div>
    )
}

const Calendar = ({ tournaments, header, onDatesSelected, filter}) => {

    const [tournament_years, setYears] = useState([])
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()
    const [selected_tournament, setSelected] = useState({selected_id: 1})

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

    const handleTournament = (id) => {
        setSelected({selected_id: id})
        console.log(id)
    }

    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                {isExpanded ? "Choose year" : header}
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    <div>
                        {tournament_years.map((year,index) => 
                        <Nested_tournaments key={index} tournaments={tournaments} year={year} header={header}
                             filter={filter} onDatesSelected={onDatesSelected} onTournamentSelected={handleTournament}></Nested_tournaments>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar