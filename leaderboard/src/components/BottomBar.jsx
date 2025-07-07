import Button from "./Button"

const BottomBar = ({sortHandler}) => {

    const sort = (func) => {
        return () => sortHandler(func)
    }

    return (
        <div>
            <Button onClick={sort((a, b) => b.gold - a.gold)} label='Gold'> </Button>
            <Button onClick={sort((a, b) => b.silver - a.silver)} label='Silver'> </Button>
            <Button onClick={sort((a, b) => b.bronze - a.bronze)} label='Bronze'> </Button>
            <Button label='Percentage'> </Button>
            <Button onClick={sort((a, b) => b.medals - a.medals)} label='Oveytur all'> </Button>
            <Button label='Extra voting'> </Button>
        </div>
    )
}

export default BottomBar