import PlayerBox from './PlayerBox'

const Leaderboard = ({players, filter_by, sort_by, start_date, end_date, tournaments}) => {

    return (
        <div className="leaderboard">
            <ul>
                {players.map( (player,index) =>
                    <PlayerBox player={player} number={index+1} key={player.id} 
                    filter_by={filter_by} sort_by={sort_by} start_date={start_date} end_date={end_date} tournaments={tournaments}/>
                )}
            </ul>
        </div>
    )
}

export default Leaderboard