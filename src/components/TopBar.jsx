import Calendar from "./Calendar"
import FilterButton from "./FilterButton"
import LightDark_Button from "./LightDark"

const TopBar = ({ reverseHandler, filterHandler, filter_by, tournaments, onStartDate, onEndDate, mode, onModeChange }) => {

    return (
        <div className="topbar">
            <Calendar className="calendar" tournaments={tournaments} default_idx={0} onDatesSelected={onStartDate} filter={filter_by} />
            <Calendar tournaments={tournaments} default_idx={tournaments.length - 1} onDatesSelected={onEndDate} filter={filter_by} />
            <FilterButton filter_by={filter_by} filterHandler={filterHandler}></FilterButton>
            <img className="reverse" src="icons/ReverseButton.svg" onClick={reverseHandler} width={55} height={55}/>
            <LightDark_Button mode={mode} onModeChange={onModeChange}/>
        </div>
    )
}

export default TopBar