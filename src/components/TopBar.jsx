import Calendar from "./Calendar"
import Button from "./Button"

const TopBar = ({reverseHandler, filterHandler, filter_by, tournaments, onStartDate, onEndDate}) => {

    return (
        <div>
            <Calendar tournaments={tournaments} default_idx={0} onDatesSelected={onStartDate} filter={filter_by}/>
            <Calendar tournaments={tournaments} default_idx={tournaments.length-1} onDatesSelected={onEndDate} filter={filter_by}/>
            <input type="radio" id="indoor" name="tournament_type" value="Indoor" checked={filter_by === "Indoor"} onChange={(e) => filterHandler(e)}></input>
            <label>Indoor</label>
            <input type="radio" id="beach" name="tournament_type" value="Beach" checked={filter_by === "Beach"} onChange={(e) => filterHandler(e)}></input>
            <label>Beach</label>
            <input type="radio" id="both" name="tournament_type" value="Both" checked={filter_by === "Both"} onChange={(e) => filterHandler(e)}></input>
            <label>Both</label>
            <Button onClick={reverseHandler} label='Reverse'/>
        </div>
    )
}

export default TopBar