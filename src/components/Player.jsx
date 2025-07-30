const Player = ({player}) => {

    return (
        <div>
            <p>{player.name}</p>
            <p>Gold: {player.placements.filter((placement) => (placement.medaltype.medal === 'Gold')).length}</p>
            <p>Silver: {player.placements.filter((placement) => (placement.medaltype.medal === 'Silver')).length}</p>
            <p>Bronze: {player.placements.filter((placement) => (placement.medaltype.medal === 'Bronze')).length}</p>
            <p>Medals: {player.placements.length}</p>
            <p>Participation Indoor: {player.participation_indoor}</p>
            <p>Participation Beach: {player.participation_beach}</p>
            <p>Winning Ratio Indoor: {((player.placements.filter((placement) => (placement.medaltype.location === 'Indoor' && placement.medaltype.medal ==='Gold')).length / player.participation_indoor) * 100).toFixed(2) + '%'}</p>
            <p>Winning Ratio Beach: {((player.placements.filter((placement) => (placement.medaltype.location === 'Beach' && placement.medaltype.medal ==='Gold')).length / player.participation_beach) * 100).toFixed(2) + '%'}</p>
            <p>Winning Ratio Both: {(player.placements.filter((placement) => (placement.medaltype.medal ==='Gold')).length / (player.participation_beach + player.participation_indoor) * 100).toFixed(2) + '%'}</p>
            <p>Extra Awards: {player.extra_awards.length}</p>
        </div>
    )
}

const percen = (n) => (n * 100).toFixed(2) + '%'

export default Player