const Player = ({player}) => {

    function percentage(medaltype, player){

    }

    return (
        <div>
            <p>{player.name}</p>
            <p>Participation Indoor: {player.participation_indoor}</p>
            <p>Participation Beach: {player.participation_beach}</p>
            <p>Extra Awards: {player.extra_awards.length}</p>
        </div>
    )
}

export default Player

/*
return (
    <div>
        <p>{player.name}</p>
        <p>Gold: {player.gold}</p>
        <p>Silver: {player.silver}</p>
        <p>Bronze: {player.bronze}</p>
        <p>Participation Indoor: {player.participation_indoor}</p>
        <p>Participation Beach: {player.participation_beach}</p>
        <p>Winning Ratio Indoor: {((player.placements.filter((placement) => (placement.medaltype === 'Gold_Indoor')).length / player.participation_indoor)*100).toFixed(2)+'%'}</p>
        <p>Winning Ratio Beach: {((player.placements.filter((placement) => (placement.medaltype === 'Gold_Beach')).length / player.participation_beach)*100).toFixed(2)+'%'}</p>
        <p>Medals: {player.gold+player.silver+player.bronze}</p>
        <p>Extra Awards: {player.extra_awards.length}</p>
    </div>
)*/