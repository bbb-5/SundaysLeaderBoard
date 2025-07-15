import Player from "./Player"
import RankBox from "./RankBox"
import PlayerBox from './PlayerBox'

const Leaderboard = ({players}) => {
    console.log(players)

    return (
        <div className="leaderboard">
            <ul>
                {players.map( (player,index) =>
                    <PlayerBox player={player} number={index+1} key={player.id}/>
                )}
            </ul>
        </div>
    )
}

export default Leaderboard