const Player = ({player}) => {

    return (
        <div>
            <p>{player.name}</p>
            <p>Gold: {player.gold}</p>
            <p>Silver: {player.silver}</p>
            <p>Bronze: {player.bronze}</p>
            <p>Participation Indoor: {player.participation_indoor}</p>
            <p>Participation Beach: {player.participation_beach}</p>
            <p>Winning Ratio Indoor: {((player.gold / player.participation_indoor)*100).toFixed(2)+'%'}</p>
            <p>Winning Ratio Beach: {((player.gold / player.participation_beach)*100).toFixed(2)+'%'}</p>
            <p>Medals: {player.gold+player.silver+player.bronze}</p>
            <p>Extra Awards: {player.extra_awards.length}</p>
        </div>
    )
}

export default Player

//Players.filter((player) => (player.gold+player.silver+player.bronze != 0)))