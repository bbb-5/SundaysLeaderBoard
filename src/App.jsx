import { useState, useEffect } from 'react'
import './App.css'
import TopBar from './components/TopBar'
import LeaderBoard from './components/LeaderBoard'
import BottomBar from './components/BottomBar'
import dataService from './services/data'

function App() {
  const [players, setPlayers] = useState([])
  const [playersShow, setPlayersShow] = useState([])
  const [filter, setFilter] = useState({filter_by: "Both"})
  const [sorter, setSorter] = useState({sort_by: "Total"})

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

  const sort = (func) => {
    return () => handleSort(func)
  }

  const ratio = (a,b,filter_by) => {

    let b_ratio = 0
    let a_ratio = 0
    
    let b_gold = (b.placements.filter((placement) => (placement.medaltype.medal===Medals.Gold))).length
    let a_gold = (a.placements.filter((placement) => (placement.medaltype.medal===Medals.Gold))).length

    
    switch(filter_by){
        case "Beach":
            b_ratio = b_gold /(b.participation_beach)
            a_ratio = a_gold /(a.participation_beach)
            return (b_ratio - a_ratio)
        
        case "Indoor":
            b_ratio = b_gold /(b.participation_indoor)
            a_ratio = a_gold /(a.participation_indoor)
            return (b_ratio - a_ratio)
        
        default: 
            b_ratio = b_gold /(b.participation_indoor+b.participation_beach)
            a_ratio = a_gold /(a.participation_indoor+a.participation_beach)
            return (b_ratio - a_ratio)
    }
  }

  const medal_sort = (a,b,medal) => {

    let b_medals = 0
    let a_medals = 0
    
    b_medals = (b.placements.filter((placement) => (placement.medaltype.medal === medal))).length
    a_medals = (a.placements.filter((placement) => (placement.medaltype.medal === medal))).length

    return (b_medals - a_medals)
  }

  const func_map = {
    'Gold': (a, b) => medal_sort(a,b,Medals.Gold),
    'Silver': (a, b) => medal_sort(a,b,Medals.Silver),
    'Bronze': (a, b) => medal_sort(a,b,Medals.Bronze),
    'Percentage': (a, b) => ratio(a,b,filter.filter_by),
    'Total': (a, b) => b.placements.length - a.placements.length,
    'Extra':  (a, b) => b.extra_awards.length - a.extra_awards.length
  };
  
  useEffect(() => {
    dataService.getData().then((jsonData) => {
      console.log(jsonData.data)
      const filtered = jsonData.data.Players.filter((player) => (player.placements.length != 0))
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

  }

  const filterPlayers = (filter) => {
    console.log(filter)
    console.log(sorter.sort_by)
    let newPlayers = undefined

    console.log("filter", filter)

    switch(filter){
      case Filters.Beach:
        newPlayers = [...players].filter((player) => (player.placements.some((placements) => placements.medaltype.location === Filters.Beach)))
        console.log(newPlayers)
        break

      case Filters.Indoor:
        newPlayers = [...players].filter((player) => (player.placements.some((placements) => placements.medaltype.location === Filters.Indoor)))
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
    <TopBar reverseHandler={handleReverse} filterHandler={handleFilter} filter_by={filter.filter_by}></TopBar>
    <LeaderBoard players={playersShow} sort_by={sorter.sort_by} filter_by={filter.filter_by}></LeaderBoard>
    <BottomBar handleSelected={handleSelected} sort_by={sorter.sort_by}/>
    </>
  )
}

export default App