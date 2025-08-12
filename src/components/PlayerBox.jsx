import Player from "./Player"
import RankBox from "./RankBox"

const PlayerBox = ({player,number, filter_by, sort_by}) => {
    return (
        <div>
            <li key={player.id}>
            <RankBox number={number}/>
            <Player key={player.id} player={player} filter_by={filter_by} sort_by={sort_by}/>
            </li>
        </div>
    )
}

export default PlayerBox