import Player from "./Player"

const Leaderboard = ({players}) => {
    console.log(players)
    return (
        <div>
            <ul>
                {players.map(player =>
                    <Player key={player.id} player={player}/>
                )}
            </ul>
        </div>
    )
}

export default Leaderboard