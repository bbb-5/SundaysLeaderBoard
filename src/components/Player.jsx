const Player = ({player}) => {

    return (
        <div>
            <p>{player.name}</p>
            <p>Gold: {player.gold}</p>
            <p>Silver: {player.silver}</p>
            <p>Bronze: {player.bronze}</p>
            <p>Participation: {player.participation}</p>
            <p>Winning Ratio: {((player.gold / player.participation)*100).toFixed(2)+'%'}</p>
            <p>Medals: {player.gold+player.silver+player.bronze}</p>
            <p>Extra Awards: {player.extra_awards.length}</p>
        </div>
    )
}

export default Player