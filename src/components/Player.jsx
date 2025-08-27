import {useCollapse} from 'react-collapsed'

const Player = ({player, filter_by, sort_by}) => {

    const Filters = {
        Indoor: "Indoor",
        Beach: "Beach",
        Both: "Both"
    }

    const Sorters = {
        Gold: "Gold",
        Silver: "Silver",
        Bronze: "Bronze",
        Percentage: "Percentage",
        Total: "Total",
        Extra: "Extra",
        Default: "Default"
    }

    const Medals = {
        Gold: "Gold",
        Silver: "Silver",
        Bronze: "Bronze"
      }

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

    const percen = (n) => (n * 100).toFixed(2) + '%'

    const ratio = (player, filter) => {
        switch(filter){
            case Filters.Indoor:
                if (player.participation_indoor === 0){
                    return 0
                } else {
                    return (player.placements.filter((placement) => 
                    (placement.medaltype.location === 'Indoor' && placement.medaltype.medal ==='Gold')).length /
                     player.participation_indoor)
                }
            case Filters.Beach:
                if (player.participation_beach === 0){
                    return 0
                } else {
                    return (player.placements.filter((placement) => 
                    (placement.medaltype.location === 'Beach' && placement.medaltype.medal ==='Gold')).length /
                     player.participation_beach)
                }
        
            default:
                if (player.participation_beach+player.participation_indoor === 0){
                    return 0
                } else {
                    return (player.placements.filter((placement) =>
                        (placement.medaltype.medal ==='Gold')).length /
                     (player.participation_beach + player.participation_indoor))
                }
        }
    }

    const count_medals = (medal, filter, player) => {

        if(filter != Filters.Both){
            return (player.placements.filter((placement) => (placement.medaltype.medal === medal &&
                placement.medaltype.location === filter)).length)
        }

        return (player.placements.filter((placement) => (placement.medaltype.medal === medal)).length)
    }

    const count_total = (filter, player) => {

        if(filter != Filters.Both){
            return (player.placements.filter((placement) => (placement.medaltype.location === filter_by)).length)
        }

        return (player.placements.length)
    }


    const count_participation = (filter, player) => {

        switch(filter){
            case Filters.Beach:
                return player.participation_beach
            case Filters.Indoor:
                return player.participation_indoor
            default: 
                return (player.participation_beach + player.participation_indoor)
        }
    }

    const count_ratio = (filter, player) => {

        switch(filter){
            case Filters.Beach:
                return percen(ratio(player,Filters.Beach))
            case Filters.Indoor:
                return percen(ratio(player,Filters.Indoor))
            default: 
                return (percen(ratio(player,Filters.Both)))
        }
    }

  const player_default_map = {
    'Gold':
    <div>
        <p>{player.name} Gold: {count_medals(Medals.Gold, filter_by, player)}</p>
    </div>,

    'Silver':
    <div>
        <p>{player.name} Silver: {count_medals(Medals.Silver, filter_by, player)}</p>
    </div>,

    'Bronze':
    <div>
        <p>{player.name} Bronze: {count_medals(Medals.Bronze, filter_by, player)}</p>
    </div>,

    'Percentage':
    <div>
        <p>{player.name} Participated: {count_participation(filter_by, player)} W Ratio: {count_ratio(filter_by, player)}</p>
    </div>,

    'Total':
    <div>
        <p>{player.name} Medals: {count_total(filter_by, player)}</p>
    </div>,

    'Extra':  
    <div>
        <p>{player.name} Extra Awards: {player.extra_awards.length}</p>
    </div>,

    'Default':  
    <div>
        <p>{player.name} M: {count_total(filter_by, player)} G: {count_medals(Medals.Gold, filter_by, player)}
             S: {count_medals(Medals.Silver, filter_by, player)} B: {count_medals(Medals.Bronze, filter_by, player)}</p>
    </div>
  };

    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                {isExpanded ? player_default_map[sort_by] : player_default_map[sort_by]}
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    Now you can see the hidden content. <br/><br/>
                    Click again to hide...
                </div>
            </div>
        </div>
    )
}

export default Player

/*
        <p>Participation Indoor: {player.participation_indoor}</p>
        <p>Participation Beach: {player.participation_beach}</p>
        <p>Winning Ratio Indoor: {percen(ratio(player,Filters.Indoor))}</p>
        <p>Winning Ratio Beach: {percen(ratio(player,Filters.Beach))}</p>
        <p>Winning Ratio Both: {percen(ratio(player,Filters.Both))}</p>
        
        <p>Gold: {count_medals(Medals.Gold, filter_by, player)}</p>
        <p>Silver: {count_medals(Medals.Silver, filter_by, player)}</p>
        <p>Bronze: {count_medals(Medals.Bronze, filter_by, player)}</p>*/