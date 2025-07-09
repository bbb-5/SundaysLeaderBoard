const Player = ({player}) => {
    return (
        <li>
            <p>{player.name}</p>
            <p>Gold: {player.gold}</p>
            <p>Silver: {player.silver}</p>
            <p>Bronze: {player.bronze}</p>
            <p>Participation: {player.participation}</p>
            <p>Ratio: {player.gold / player.participation}</p>
            <p>Extra Awards: {player.extra_awards.length}</p>
        </li>
    )
}

export default Player