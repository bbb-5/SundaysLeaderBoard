import Button from "./Button"

const TopBar = ({reverseHandler, filterHandler}) => {
    
    /*
    return (
        <div>
            <Button onClick={() => filterHandler('Indoor')} label='Indoor'> </Button>
            <Button onClick={() => filterHandler('Beach')} label='Beach'> </Button>
            <Button label='Both'> </Button>
            <Button onClick={reverseHandler} label='Reverse'> </Button>
        </div>
    )*/

    return (
        <div>
            <input type="radio" id="indoor" name="tournament_type"></input>
            <label>Indoor</label>
            <input type="radio" id="beach" name="tournament_type"></input>
            <label>Beach</label>
            <input type="radio" id="both" name="tournament_type" defaultChecked></input>
            <label>Both</label>
            <Button onClick={reverseHandler} label='Reverse'> </Button>
        </div>
    )
}

export default TopBar