const Filter_Button = ({filterHandler, filter_by}) => {

    const Filters = {
        Indoor: "Indoor",
        Beach: "Beach"
    }

    /*
    const [filter_state, setState] = useState(0)

        useEffect(() => {
            setState(state)
        }, [filter_state])*/

    switch (filter_by) {
        case Filters.Indoor: 
            return (
                <img className="filter_button" src="icons/ICONS2_TIndoor.svg" onClick={(e) => filterHandler(e)} width={55} height={55}/>
            )
        case Filters.Beach:
            return (
                <img className="filter_button" src="icons/ICONS2_TBeach.svg" onClick={(e) => filterHandler(e)} width={55} height={55}/>
            )
        default:
            return (
                <img className="filter_button" src="icons/ICONS2_TBeach - Indoor.svg" onClick={(e) => filterHandler(e)} width={55} height={55}/>
            )
    }
    
}

export default Filter_Button