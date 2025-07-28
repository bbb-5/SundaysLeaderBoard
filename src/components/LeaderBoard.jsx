import PlayerBox from './PlayerBox'

const Leaderboard = ({players}) => {

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