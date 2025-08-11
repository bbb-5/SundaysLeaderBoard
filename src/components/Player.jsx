const Player = ({player}) => {

    const Filters = {
        Indoor: "Indoor",
        Beach: "Beach",
        Both: "Both"
    }

    const percen = (n) => (n * 100).toFixed(2) + '%'

    const ratio = (player, filter) => {
        switch(filter){
            case Filters.Indoor:
                if (player.participation_indoor === 0){
                    return 0
                } else {
                    return (player.placements.filter((placement) => (placement.medaltype.location === 'Indoor' && placement.medaltype.medal ==='Gold')).length / player.participation_indoor)
                }
            case Filters.Beach:
                if (player.participation_beach === 0){
                    return 0
                } else {
                    return (player.placements.filter((placement) => (placement.medaltype.location === 'Beach' && placement.medaltype.medal ==='Gold')).length / player.participation_beach)
                }
        
            default:
                if (player.participation_beach === 0){
                    return 0
                } else {
                    return (player.placements.filter((placement) => (placement.medaltype.medal ==='Gold')).length / (player.participation_beach + player.participation_indoor))
                }
        }
    }

    return (
        <div>
            <p>{player.name}</p>
            <p>Gold: {player.placements.filter((placement) => (placement.medaltype.medal === 'Gold')).length}</p>
            <p>Silver: {player.placements.filter((placement) => (placement.medaltype.medal === 'Silver')).length}</p>
            <p>Bronze: {player.placements.filter((placement) => (placement.medaltype.medal === 'Bronze')).length}</p>
            <p>Medals: {player.placements.length}</p>
            <p>Participation Indoor: {player.participation_indoor}</p>
            <p>Participation Beach: {player.participation_beach}</p>
            <p>Winning Ratio Indoor: {percen(ratio(player,Filters.Indoor))}</p>
            <p>Winning Ratio Beach: {percen(ratio(player,Filters.Beach))}</p>
            <p>Winning Ratio Both: {percen(ratio(player,Filters.Both))}</p>
            <p>Extra Awards: {player.extra_awards.length}</p>
        </div>
    )
}

export default Player

//<p>Winning Ratio Indoor: {percen(player.placements.filter((placement) => (placement.medaltype.location === 'Indoor' && placement.medaltype.medal ==='Gold')).length / player.participation_indoor)}</p>
//<p>Winning Ratio Beach: {percen(player.placements.filter((placement) => (placement.medaltype.location === 'Beach' && placement.medaltype.medal ==='Gold')).length / player.participation_beach)}</p>
//<p>Winning Ratio Both: {percen(player.placements.filter((placement) => (placement.medaltype.medal ==='Gold')).length / (player.participation_beach + player.participation_indoor))}</p>