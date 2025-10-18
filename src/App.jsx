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
  const [filter, setFilter] = useState({filter_by: "Both"})
  const [sorter, setSorter] = useState({sort_by: "Default"})
  const [start_date, setStart] = useState({start_date: "2024-02-25T09:00:00Z"})
  const [end_date, setEnd] = useState({end_date: "2025-06-22T11:30:00Z"})
  
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
  
  const onDatesSelected = (head, date) => {

      switch(head){

        case Dates.Start: 
          setStart({start_date: date})
          console.log('start: ', date)
          break

        case Dates.End: 
        setEnd({end_date: date})
        console.log('end: ', date)
        break
      }
  }

  const sort = (func) => {
    return () => handleSort(func)
  }

  const ratio = (a,b,filter) => {

    let b_ratio = 0
    let a_ratio = 0

    let b_gold = 0
    let a_gold = 0
    
    if(filter != Filters.Both){
      b_gold = (b.placements.filter((placement) => 
        ((placement.medaltype.medal === Medals.Gold) && (placement.medaltype.location === filter)))).length

      a_gold = (a.placements.filter((placement) => 
        ((placement.medaltype.medal === Medals.Gold) && (placement.medaltype.location === filter)))).length
    } else {
      b_gold = (b.placements.filter((placement) => 
        ((placement.medaltype.medal === Medals.Gold)))).length
  
      a_gold = (a.placements.filter((placement) => 
        ((placement.medaltype.medal === Medals.Gold)))).length
    } 
    
    switch(filter){
        case Filters.Beach:
            b_ratio = b_gold /(b.participation_beach)
            a_ratio = a_gold /(a.participation_beach)
            return (b_ratio - a_ratio)
        
        case Filters.Indoor:
            b_ratio = b_gold /(b.participation_indoor)
            a_ratio = a_gold /(a.participation_indoor)
            return (b_ratio - a_ratio)
        
        default: 
            b_ratio = b_gold /(b.participation_indoor+b.participation_beach)
            a_ratio = a_gold /(a.participation_indoor+a.participation_beach)
            return (b_ratio - a_ratio)
    }
  }

  const medal_sort = (a,b,medal, filter) => {

    let b_medals = 0
    let a_medals = 0
    
    if(filter != Filters.Both){
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

  const total_sort = (a,b,filter) => {

    let b_medals = 0
    let a_medals = 0
    
    if(filter != Filters.Both){
      b_medals = (b.placements.filter((placement) => 
        (placement.medaltype.location === filter))).length
      a_medals = (a.placements.filter((placement) => 
        (placement.medaltype.location === filter))).length
    } else {
      b_medals = b.placements.length
      a_medals = a.placements.length
    }
    return (b_medals - a_medals)
  }

  const func_map = {
    'Gold': (a, b) => medal_sort(a,b,Medals.Gold, filter.filter_by),
    'Silver': (a, b) => medal_sort(a,b,Medals.Silver, filter.filter_by),
    'Bronze': (a, b) => medal_sort(a,b,Medals.Bronze, filter.filter_by),
    'Percentage': (a, b) => ratio(a,b,filter.filter_by),
    'Total': (a, b) => total_sort(a,b,filter.filter_by),
    'Extra':  (a, b) => b.extra_awards.length - a.extra_awards.length,
    'Default':  (a, b) => medal_sort(a,b,Medals.Gold, filter.filter_by)
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
    setSorter({sort_by: e.target.value})
    console.log(e.target.value) 
    handleSort(func_map[e.target.value])
    console.log(func_map[e.target.value])
  }

  useEffect(() => {
    filterPlayers(filter.filter_by) 
    console.log('Updated: ', filter.filter_by)
  }, [filter.filter_by])

  const handleFilter = (e) => { 
    setFilter({filter_by: e.target.value})
    console.log(e.target.value)
    filterTournaments(e.target.value)
  }

  const filterTournaments = (filter) => {
    //debugger;
    let newTournaments = undefined

    switch(filter){
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

    switch(filter){
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
    <TopBar reverseHandler={handleReverse} filterHandler={handleFilter} filter_by={filter.filter_by} tournaments={tournaments} onDatesSelected={onDatesSelected}> </TopBar>
    <LeaderBoard players={playersShow} sort_by={sorter.sort_by} filter_by={filter.filter_by}></LeaderBoard>
    <BottomBar handleSelected={handleSelected} sort_by={sorter.sort_by} filter_by={filter.filter_by}/>
    </>
  )
}

export default App