const Player = ({player}) => {
    return (
        <li>
            <p>{player.player_name}</p>
            <p>Gold: {player.gold}</p>
            <p>Silver: {player.silver}</p>
            <p>Bronze: {player.bronze}</p>
        </li>
    )
}

export default Player