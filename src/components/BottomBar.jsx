import Button from "./Button"

const BottomBar = ({sortHandler, filter_by, players}) => {

    const sort = (func) => {
        return () => sortHandler(func)
    }

    const ratio = (a,b,filter_by) => {

        console.log(filter_by)
        console.log('Made it')

        let b_ratio = 0
        let a_ratio = 0

        
        switch(filter_by){
            case "Beach":
                console.log('There')   
                b_ratio = (b.placements.filter((placement) => (placement.medaltype.medal==='Gold'))).length/(b.participation_beach)
                a_ratio = (a.placements.filter((placement) => (placement.medaltype.medal==='Gold'))).length/(a.participation_beach)
                return (b_ratio - a_ratio)
            
            case "Indoor":
                console.log('Now')   
                b_ratio = ((b.placements.filter((placement) => (placement.medaltype.medal==='Gold'))).length/(b.participation_indoor))
                a_ratio = ((a.placements.filter((placement) => (placement.medaltype.medal==='Gold'))).length/(a.participation_indoor))
                return (b_ratio - a_ratio)
            
            default: 
                console.log('Here')
                b_ratio = ((b.placements.filter((placement) => (placement.medaltype.medal==='Gold'))).length/(b.participation_indoor+b.participation_beach))
                a_ratio = ((a.placements.filter((placement) => (placement.medaltype.medal==='Gold'))).length/(a.participation_indoor+a.participation_beach))
                return (b_ratio - a_ratio)
        }
    }

    return (
        <div>
            <Button onClick={sort((a, b) => (b.placements.filter((placement) => (placement.medaltype.medal ==='Gold'))).length - (a.placements.filter((placement) => (placement.medaltype.medal ==='Gold'))).length)} label='Gold'> </Button>
            <Button onClick={sort((a, b) => (b.placements.filter((placement) => (placement.medaltype.medal ==='Silver'))).length - (a.placements.filter((placement) => (placement.medaltype.medal ==='Silver'))).length)} label='Silver'> </Button>
            <Button onClick={sort((a, b) => (b.placements.filter((placement) => (placement.medaltype.medal ==='Bronze'))).length - (a.placements.filter((placement) => (placement.medaltype.medal ==='Bronze'))).length)} label='Bronze'> </Button>

            <Button onClick={sort((a, b) => ratio(a,b,filter_by))} label='Percentage'> </Button>

            <Button onClick={sort((a, b) => b.placements.length - a.placements.length)} label='Over all'> </Button>
            <Button onClick={sort((a, b) => b.extra_awards.length - a.extra_awards.length)} label='Extra voting'> </Button>
        </div>
    )
}

export default BottomBar