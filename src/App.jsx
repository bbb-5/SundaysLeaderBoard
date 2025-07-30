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
  
  useEffect(() => {
    dataService.getData().then((jsonData) => {
      console.log(jsonData.data)
      setPlayers(jsonData.data.Players.filter((player) => (player.placements.length != 0)))
      setPlayersShow(jsonData.data.Players.filter((player) => (player.placements.length != 0)))
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

  const handleFilter = (e) => {
    console.log(e)
    setFilter({filter_by: e.target.value})
    console.log(e.target.value)
    filterPlayers(e.target.value) 
  }

  const filterPlayers = (filter) => {
    console.log(filter)
    if (filter === 'Both') {
      const newPlayers = [...players]
        .map((player) => (
          { ...player, placements: player.placements.filter(placement => placement.medaltype.location === 'Beach' || placement.medaltype.location === 'Indoor')}
        ))
        .filter(player => player.placements.some((placements) => placements.medaltype.location === 'Beach' || 'Indoor'))

      setPlayersShow(newPlayers)
      console.log(newPlayers)
    } else {
      const newPlayers = [...players]
        .map((player) => (
          { ...player, placements: player.placements.filter(placement => placement.medaltype.location === filter)}
        ))  
        .filter((player) => player.placements.some((placements) => placements.medaltype.location === filter))

      setPlayersShow(newPlayers)
      console.log(newPlayers)
    }
  }

  return (
    <>
    <h1>Sunday's Leaderboard</h1>
    <TopBar reverseHandler={handleReverse} filterHandler={handleFilter} filter_by={filter.filter_by}></TopBar>
    <LeaderBoard players={playersShow}></LeaderBoard>
    <BottomBar sortHandler={handleSort} filter_by={filter.filter_by} players={playersShow}/>
    </>
  )
}

export default App