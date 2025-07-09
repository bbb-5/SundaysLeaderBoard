import Button from "./Button"

const TopBar = ({reverseHandler}) => {
    return (
        <div>
            <Button label='Indoor'> </Button>
            <Button label='Beach'> </Button>
            <Button label='Both'> </Button>
            <Button onClick={reverseHandler} label='Reverse'> </Button>
        </div>
    )
}

export default TopBar