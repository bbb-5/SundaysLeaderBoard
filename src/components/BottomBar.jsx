import Button from "./Button"

const BottomBar = ({sortHandler, filter_by, players}) => {

    const sort = (func) => {
        return () => sortHandler(func)
    }

    return (
        <div>
            <Button onClick={sort((a, b) => (b.placements.filter((placement) => (placement.medaltype.location === 'Indoor' && placement.medaltype.medal ==='Gold'))) - (a.placements.filter((placement) => (placement.medaltype.location === 'Indoor' && placement.medaltype.medal ==='Gold'))))} label='Gold'> </Button>
            <Button onClick={sort((a, b) => b.silver - a.silver)} label='Silver'> </Button>
            <Button onClick={sort((a, b) => b.bronze - a.bronze)} label='Bronze'> </Button>
            <Button onClick={sort((a, b) => (b.gold/b.participation) - (a.gold/a.participation))} label='Percentage'> </Button>

            <Button onClick={sort((a, b) => b.placements.length - a.placements.length)} label='Over all'> </Button>
            <Button onClick={sort((a, b) => b.extra_awards.length - a.extra_awards.length)} label='Extra voting'> </Button>
        </div>
    )
}


//(player.placements.filter((placement) => (placement.medaltype.location === 'Indoor' && placement.medaltype.medal ==='Gold')

export default BottomBar