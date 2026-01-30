import { useCollapse } from 'react-collapsed'

const Player = ({ player, filter_by, sort_by, start_date, end_date, tournaments }) => {

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

  const is_in_daterange = (date) => {
    const checked_date = new Date(date)
    return (checked_date >= start_date && checked_date <= end_date)
  }

  const percen = (n) => (n * 100).toFixed(2) + '%'

  const get_in_date_participations = (filter) => { //!!

    let participations = get_participations(filter, player.id)

    return participations.filter((participation) =>
      (is_in_daterange(participation.date)))

  }

  const ratio = (filter) => { //!!

    let in_date = get_in_date_participations(filter)

    if (in_date.length === 0) {
      return 0
    }

    switch (filter) {
      case Filters.Indoor:
        return (count_medals(Medals.Gold, Filters.Indoor, player)
          / count_participation(Filters.Indoor, player))

      case Filters.Beach:
        return (count_medals(Medals.Gold, Filters.Beach, player)
          / count_participation(Filters.Beach, player))

      default:
        return (count_medals(Medals.Gold, Filters.Both, player)
          / count_participation(Filters.Both, player))
    }
  }

  const count_medals = (medal, filter) => { //!!

    let in_date = get_in_date_participations(filter)

    let filtered = get_player_placements(filter, player).filter((placement) =>
      placement.medaltype.medal === medal)

    let counter = 0
    let placement_ids = filtered.map(a => a.tournament_id)

    in_date.forEach(tournament => {
      if (placement_ids.includes(tournament.id)) {
        counter++
      }
    })
    return counter

  }

  const count_total = (filter) => { //!!

    let in_date = get_in_date_participations(filter)

    let counter = 0
    let placement_ids = player.placements.map(a => a.tournament_id)

    in_date.forEach(tournament => {
      if (placement_ids.includes(tournament.id)) {
        counter++
      }
    })
    return counter

  }

  const count_participation = (filter) => { //!!

    return get_in_date_participations(filter).length

  }

const get_participations = (filter, player_id) => { //!!

    switch (filter) {
      case Filters.Beach:
        return (tournaments.filter((tournament) => (
          tournament.type === Filters.Beach &&
          tournament.participants.includes(player_id))))

      case Filters.Indoor:
        return (tournaments.filter((tournament) => (
          tournament.type === Filters.Indoor &&
          tournament.participants.includes(player_id))))

      default:
        return (tournaments.filter((tournament) => (
          tournament.participants.includes(player_id))))
    }
  }

  const count_ratio = (filter) => { //!!

    switch (filter) {
      case Filters.Beach:
        return percen(ratio(Filters.Beach))
      case Filters.Indoor:
        return percen(ratio(Filters.Indoor))
      default:
        return (percen(ratio(Filters.Both)))
    }
  }

  const get_player_placements = (filter) => { //!!

    let placements = []

    if (filter != Filters.Both) {
      placements = player.placements.filter((placement) =>
        (placement.medaltype.location === filter))
    } else {
      placements = player.placements
    }

    return placements
  }

  const get_tournament_name = (tournament_id) => {

    const found_tournament = tournaments.find((tounament) =>
      tounament.id === tournament_id
    )

    if (found_tournament === undefined) {
      return
    }

    return found_tournament.name
  }

  const get_tournament_date = (tournament_id) => {


    let found_tournament = tournaments.find((tournament) =>
      tournament.id === tournament_id
    )

    if (found_tournament === undefined) {
      return
    }
    return found_tournament.date
  }

  const list_placements = (placements) => {

    return (
      <ul>
        {placements.map((placement) =>
          <li key={placement.tournament_id}>{placement.medaltype.medal}
            {get_tournament_name(placement.tournament_id)} {get_tournament_date(placement.tournament_id)}</li>
        )}
      </ul>)
  }

  const get_player_extras = () => {
    return (
      <ul>
        {player.extra_awards.map((extra_award) =>
          <li key={extra_award.id}> EXTRA {extra_award.name}
            {extra_award.tournament_name} {extra_award.tournament_date}</li>
        )}
      </ul>)
  }

  const get_player_golds = (filter) => {
    let golds = (player.placements.filter((placement) =>
      ((placement.medaltype.medal === Sorters.Gold) && (placement.medaltype.location === filter))))

    return (
      <ul>
        {golds.map((placement) =>
          <li key={placement.tournament_id}>{get_tournament_name(placement.tournament_id)} {get_tournament_date(placement.tournament_id)}</li>
        )}
      </ul>)
  }

  const get_medal_value = (medaltype, current) => {
    switch (medaltype) {
      case current:
        return 3
      case Medals.Gold:
        return 2
      case Medals.Silver:
        return 1
      case Medals.Bronze:
        return 0
    }
    return 0
  }

  const compare_medals = (a, b, current) => {

    let a_value = get_medal_value(a.medaltype.medal, current)
    let b_value = get_medal_value(b.medaltype.medal, current)

    return b_value - a_value
  }

  const sort_by_medal = (medal, placements) => {
    return [...placements].sort((a, b) => compare_medals(a, b, medal))
  }

  const player_default_map = {
    'Gold':
      <div>
        <p>{player.name} Gold: {count_medals(Medals.Gold, filter_by)}</p>
      </div>,

    'Silver':
      <div>
        <p>{player.name} Silver: {count_medals(Medals.Silver, filter_by)}</p>
      </div>,

    'Bronze':
      <div>
        <p>{player.name} Bronze: {count_medals(Medals.Bronze, filter_by)}</p>
      </div>,

    'Percentage':
      <div>
        <p>{player.name} Participated: {count_participation(filter_by)} W Ratio: {count_ratio(filter_by)}</p>
      </div>,

    'Total':
      <div>
        <p>{player.name} Medals: {count_total(filter_by)}</p>
      </div>,

    'Extra':
      <div>
        <p>{player.name} Extra Awards: {player.extra_awards.length}</p>
      </div>,

    'Default':
      <div>
        <p>{player.name} M: {count_total(filter_by)} G: {count_medals(Medals.Gold, filter_by)}
          S: {count_medals(Medals.Silver, filter_by)} B: {count_medals(Medals.Bronze, filter_by)}</p>
      </div>
  };

  const player_pressed_map = {
    'Gold':
      <div>
        {list_placements(sort_by_medal(Medals.Gold, get_player_placements(filter_by)))}
      </div>,

    'Silver':
      <div>
        {list_placements(sort_by_medal(Medals.Silver, get_player_placements(filter_by)))}
      </div>,

    'Bronze':
      <div>
        {list_placements(sort_by_medal(Medals.Bronze, get_player_placements(filter_by)))}
      </div>,

    'Percentage':
      <div>
        <p>INDOOR {count_medals(Medals.Gold, Filters.Indoor)}/{count_participation(Filters.Indoor)}  {count_ratio(Filters.Indoor)}  </p>
        {get_player_golds(Filters.Indoor)}
        <p>BEACH  {count_medals(Medals.Gold, Filters.Beach)}/{count_participation(Filters.Beach)}   {count_ratio(Filters.Beach)}   </p>
        {get_player_golds(Filters.Beach)}
        <p>BOTH   {count_medals(Medals.Gold, Filters.Both)}/{count_participation(Filters.Both)}    {count_ratio(Filters.Both)}    </p>
      </div>,

    'Total':
      <div>
        {list_placements(get_player_placements(filter_by))}
      </div>,

    'Extra':
      <div>
        {get_player_extras()}
      </div>,

    'Default':
      <div>
        {list_placements(get_player_placements(filter_by))}
        {get_player_extras()}
      </div>
  };

  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        {isExpanded ? player_default_map[sort_by] : player_default_map[sort_by]}
      </div>
      <div {...getCollapseProps()}>
        <div className="content">
          {player_pressed_map[sort_by]}
        </div>
      </div>
    </div>
  )
}

export default Player
