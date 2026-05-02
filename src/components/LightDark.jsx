const LightDark_Button = ({mode, onModeChange}) => {

    switch (mode) {
        case 0: 
            return (
                <img className="dark_button" src="icons/Moon.svg" onClick={(e) => onModeChange(e)} width={55} height={55}/>
            )
        case 1:
            return (
                <img className="light_button" src="icons/Sun.svg" onClick={(e) => onModeChange(e)} width={55} height={55}/>
            )
    }
    
}

export default LightDark_Button