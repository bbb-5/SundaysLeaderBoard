import Player from "./Player"
import RankBox from "./RankBox"

const PlayerBox = ({ player, number, filter_by, sort_by, start_date, end_date, tournaments }) => {
    return (
            <li key={player.id}>
                <div className="playerbox">
                <RankBox className="rankbox" number={number} />
                <Player key={player.id} player={player} filter_by={filter_by} sort_by={sort_by}
                    start_date={start_date} end_date={end_date} tournaments={tournaments} />
                </div>
            </li>
    )
}

export default PlayerBox