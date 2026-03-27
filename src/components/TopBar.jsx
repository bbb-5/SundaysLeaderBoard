import Calendar from "./Calendar"

const TopBar = ({ reverseHandler, filterHandler, filter_by, tournaments, onStartDate, onEndDate }) => {

    return (
        <div className="topbar">
            <Calendar className="calendar" tournaments={tournaments} default_idx={0} onDatesSelected={onStartDate} filter={filter_by} />
            <Calendar tournaments={tournaments} default_idx={tournaments.length - 1} onDatesSelected={onEndDate} filter={filter_by} />

            <label>
                <input type="radio" className="filter" id="indoor" name="tournament_type" value="Indoor" checked={filter_by === "Indoor"} onChange={(e) => filterHandler(e)}></input>
                <img src="icons/TournamentIndoor.svg" width={55} height={55} />
            </label>
            
            <label>
                <input type="radio" className="filter" id="beach" name="tournament_type" value="Beach" checked={filter_by === "Beach"} onChange={(e) => filterHandler(e)}></input>
                <img src="icons/TournamentBeach.svg" width={55} height={55} />
            </label>

            <label>
                <input type="radio" className="filter" id="both" name="tournament_type" value="Both" checked={filter_by === "Both"} onChange={(e) => filterHandler(e)}></input>
                <img src="icons/TournamentBeachIndoor.svg" width={55} height={55} />
            </label>

            <img className="reverse" src="icons/ReverseButton.svg" onClick={reverseHandler} width={55} height={55}/>
            
        </div>
    )
}

export default TopBar