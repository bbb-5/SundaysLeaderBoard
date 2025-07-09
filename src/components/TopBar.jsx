import Button from "./Button"

const TopBar = ({reverseHandler, filterHandler}) => {
    return (
        <div>
            <Button onClick={() => filterHandler('Indoor')} label='Indoor'> </Button>
            <Button onClick={() => filterHandler('Beach')} label='Beach'> </Button>
            <Button label='Both'> </Button>
            <Button onClick={reverseHandler} label='Reverse'> </Button>
        </div>
    )
}

export default TopBar