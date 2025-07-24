import Button from "./Button"

const TopBar = ({reverseHandler, filterHandler, filter_by}) => {
    
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
            <input type="radio" id="indoor" name="tournament_type" value="Indoor" checked={filter_by === "Indoor"} onChange={(e) => filterHandler(e)}></input>
            <label>Indoor</label>
            <input type="radio" id="beach" name="tournament_type" value="Beach" checked={filter_by === "Beach"} onChange={(e) => filterHandler(e)}></input>
            <label>Beach</label>
            <input type="radio" id="both" name="tournament_type" value="Both" checked={filter_by === "Both"} onChange={(e) => filterHandler(e)}></input>
            <label>Both</label>
            <Button onClick={reverseHandler} label='Reverse'> </Button>
        </div>
    )
}

export default TopBar