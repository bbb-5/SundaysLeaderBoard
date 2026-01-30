import { useState, useEffect } from 'react'
import './App.css'
import TopBar from './components/TopBar'
import LeaderBoard from './components/LeaderBoard'
import BottomBar from './components/BottomBar'
import dataService from './services/data'

function App() {
  const [players, setPlayers] = useState([])
  const [tournaments, setTournaments] = useState([])
  const [all_tournaments, set_all_Tournaments] = useState([])
  const [playersShow, setPlayersShow] = useState([])
  const [filter, setFilter] = useState({ filter_by: "Both" })
  const [sorter, setSorter] = useState({ sort_by: "Default" })
  const [start_date, setStart] = useState(new Date("2024-02-25T09:00:00Z"))
  const [end_date, setEnd] = useState(new Date("2025-06-22T11:30:00Z"))

  const Medals = {
    Gold: "Gold",
    Silver: "Silver",
    Bronze: "Bronze"
  }

  const Filters = {
    Indoor: "Indoor",
    Beach: "Beach",
    Both: "Both"
  }

  const Dates = {
    Start: "Start date",
    End: "End date"
  }

  const is_in_daterange = (date) => {
    const checked_date = new Date(date)
    return (checked_date >= start_date && checked_date <= end_date)
  }

  const count_medals = (medal, filter, player) => {

    let in_date = get_in_date_participations(filter, player)

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

  const get_in_date_participations = (filter, player) => {

    let participations = get_participations(filter, player.id)

    return participations.filter((participation) =>
      (is_in_daterange(participation.date)))

  }

  const get_participations = (filter, player_id) => {

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

  const get_player_placements = (filter, player) => {

    let placements = []

    if (filter != Filters.Both) {
      placements = player.placements.filter((placement) =>
        (placement.medaltype.location === filter))
    } else {
      placements = player.placements
    }

    return placements
  }

  const get_tournament_date = (tournament_id) => {

    let found_tournament = tournaments.find((tounament) =>
      tounament.id === tournament_id
    )

    if (found_tournament === undefined) {
      return
    }

    return found_tournament.date
  }

  const ratio = (a, b, filter) => {

    let b_gold = count_medals(Medals.Gold, filter, b)
    let a_gold = count_medals(Medals.Gold, filter, a)

    let b_ratio = b_gold / (get_in_date_participations(filter, b)).length
    let a_ratio = a_gold / (get_in_date_participations(filter, a)).length
    return (b_ratio - a_ratio)

  }

  const medal_sort = (a, b, medal, filter) => {

    let b_medals = 0
    let a_medals = 0

    if (filter != Filters.Both) {
      b_medals = (b.placements.filter((placement) =>
        ((placement.medaltype.medal === medal) && (placement.medaltype.location === filter)))).length
      a_medals = (a.placements.filter((placement) =>
        ((placement.medaltype.medal === medal) && (placement.medaltype.location === filter)))).length
    } else {
      b_medals = (b.placements.filter((placement) => ((placement.medaltype.medal === medal)))).length
      a_medals = (a.placements.filter((placement) => ((placement.medaltype.medal === medal)))).length
    }
    return (b_medals - a_medals)
  }

  const total_sort = (a, b, filter) => {

    console.log("total sort filter: ", filter)

    let b_medals = 0
    let a_medals = 0

    if (filter != Filters.Both) {
      b_medals = (b.placements.filter((placement) =>
      ((placement.medaltype.location === filter) &&
        (is_in_daterange(get_tournament_date(placement.tournament_id)))))).length

      a_medals = (a.placements.filter((placement) =>
      ((placement.medaltype.location === filter) &&
        (is_in_daterange(get_tournament_date(placement.tournament_id)))))).length

    } else {
      b_medals = b.placements.length
      a_medals = a.placements.length
    }
    return (b_medals - a_medals)
  }

  const func_map = {
    'Gold': (a, b) => medal_sort(a, b, Medals.Gold, filter.filter_by),
    'Silver': (a, b) => medal_sort(a, b, Medals.Silver, filter.filter_by),
    'Bronze': (a, b) => medal_sort(a, b, Medals.Bronze, filter.filter_by),
    'Percentage': (a, b) => ratio(a, b, filter.filter_by),
    'Total': (a, b) => total_sort(a, b, filter.filter_by),
    'Extra': (a, b) => b.extra_awards.length - a.extra_awards.length,
    'Default': (a, b) => medal_sort(a, b, Medals.Gold, filter.filter_by)
  };

  useEffect(() => {
    dataService.getData().then((jsonData) => {
      console.log(jsonData.data)
      let filtered = jsonData.data.Players.filter((player) => (player.placements.length != 0))
      filtered = [...filtered].sort(func_map[sorter.sort_by])
      let tournaments = jsonData.data.Tournaments
      setTournaments(tournaments)
      set_all_Tournaments(tournaments)
      console.log("all tournaments here!", tournaments)
      setPlayers(filtered)
      setPlayersShow(filtered)
    })
  }, [])

  useEffect(() => {

    const newPlayers = [...players].filter((player) =>
    (player.placements.some((placement) =>
      (is_in_daterange(get_tournament_date(placement.tournament_id))))))

    setPlayersShow(newPlayers.sort(func_map[sorter.sort_by]))

  }, [start_date, end_date])

  const onDateChange = (setFunction, date) => {
    const changed_date = new Date(date)
    setFunction(changed_date)
  }

  const handleSort = (sortFunction) => {
    const newPlayers = [...playersShow].sort(sortFunction)
    setPlayersShow(newPlayers)
  }

  const handleReverse = () => {
    const newPlayers = [...playersShow].reverse()
    setPlayersShow(newPlayers)
  }

  const handleSelected = (e) => {
    console.log(e)
    setSorter({ sort_by: e.target.value })
    console.log(e.target.value)
    handleSort(func_map[e.target.value])
    console.log(func_map[e.target.value])
  }

  useEffect(() => {
    filterPlayers(filter.filter_by)
    console.log('Updated: ', filter.filter_by)
  }, [filter.filter_by])

  const handleFilter = (e) => {
    setFilter({ filter_by: e.target.value })
    console.log(e.target.value)
    filterTournaments(e.target.value)
  }

  const filterTournaments = (filter) => {

    let newTournaments = undefined

    switch (filter) {
      case Filters.Beach:
        newTournaments = [...all_tournaments].filter((tournament) => (tournament.type === Filters.Beach))
        break

      case Filters.Indoor:
        newTournaments = [...all_tournaments].filter((tournament) => (tournament.type === Filters.Indoor))
        break

      default:
        newTournaments = [...all_tournaments].filter((tournament) => (tournament.type === Filters.Indoor || Filters.Beach))
        break
    }
    setTournaments(newTournaments)
  }

  const filterPlayers = (filter) => {
    console.log(filter)
    console.log(sorter.sort_by)
    let newPlayers = undefined

    console.log("filter", filter)

    switch (filter) {
      case Filters.Beach:
        newPlayers = [...players].filter((player) => (player.placements.some((placements) =>
          placements.medaltype.location === Filters.Beach)))
        console.log(newPlayers)
        break

      case Filters.Indoor:
        newPlayers = [...players].filter((player) => (player.placements.some((placements) =>
          placements.medaltype.location === Filters.Indoor)))
        console.log(newPlayers)
        break

      default:
        newPlayers = [...players]
        console.log(newPlayers)
        break
    }
    setPlayersShow(newPlayers.sort(func_map[sorter.sort_by]))
  }

  return (
    <>
      <h1>Sunday's Leaderboard</h1>
      <TopBar reverseHandler={handleReverse} filterHandler={handleFilter} filter_by={filter.filter_by}
        tournaments={tournaments} onStartDate={(d) => { onDateChange(setStart, d) }}
        onEndDate={(d) => { onDateChange(setEnd, d) }} />
      <LeaderBoard players={playersShow} sort_by={sorter.sort_by} filter_by={filter.filter_by} start_date={start_date} end_date={end_date} tournaments={tournaments}></LeaderBoard>
      <BottomBar handleSelected={handleSelected} sort_by={sorter.sort_by} filter_by={filter.filter_by} />
    </>
  )
}

export default App