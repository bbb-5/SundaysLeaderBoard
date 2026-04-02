const Filter_Button = ({filterHandler, filter_by}) => {

    const Filters = {
        Indoor: "Indoor",
        Beach: "Beach"
    }

    switch (filter_by) {
        case Filters.Indoor: 
            return (
                <img className="filter_button" src="icons/TournamentIndoor.svg" onClick={(e) => filterHandler(e)} width={55} height={55}/>
            )
        case Filters.Beach:
            return (
                <img className="filter_button" src="icons/TournamentBeach.svg" onClick={(e) => filterHandler(e)} width={55} height={55}/>
            )
        default:
            return (
                <img className="filter_button" src="icons/TournamentBeachIndoor.svg" onClick={(e) => filterHandler(e)} width={55} height={55}/>
            )
    }
    
}

export default Filter_Button