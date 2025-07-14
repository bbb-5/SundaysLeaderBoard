import Player from "./Player"
import RankBox from "./RankBox"

const PlayerBox = ({player,number}) => {
    return (
        <div>
            <li key={player.id}>
            <RankBox number={number}/>
            <Player key={player.id} player={player}/>
            </li>
        </div>
    )
}

export default PlayerBox