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
            <Button onClick={sort((a, b) => (b.gold/b.participation) - (a.gold/a.participation))} label='Percentage'> </Button>
            <Button onClick={sort((a, b) => (b.gold+b.silver+b.bronze) - (a.gold+a.silver+a.bronze))} label='Over all'> </Button>
            <Button onClick={sort((a, b) => b.extra_awards.length - a.extra_awards.length)} label='Extra voting'> </Button>
        </div>
    )
}

export default BottomBar