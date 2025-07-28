import { useState, useEffect } from 'react'
import './App.css'
import TopBar from './components/TopBar'
import LeaderBoard from './components/LeaderBoard'
import BottomBar from './components/BottomBar'
import dataService from './services/data'

function App() {
  const [players, setPlayers] = useState([])
  const [data, setData] = useState([])
  const [filter, setFilter] = useState({filter_by: "Both"})
  
  useEffect(() => {
    dataService.getData().then((jsonData) => {
      console.log(jsonData.data)
      setData(jsonData.data)
      setPlayers(jsonData.data.Players.filter((player) => (player.placements.length != 0)))
    })
  }, [])

  const handleSort = (sortFunction) => {
    const newPlayers = [...players].sort(sortFunction)
    setPlayers(newPlayers)
  }

  const handleReverse = () => {
    const newPlayers = [...players].reverse()
    setPlayers(newPlayers)
  }

  const handleFilter = (e) => {
    console.log(e)
    setFilter({filter_by: e.target.value})
    console.log(e.target.value)
    console.log(filter.filter_by)    
  }

  return (
    <>
    <h1>Sunday's Leaderboard</h1>
    <TopBar reverseHandler={handleReverse} filterHandler={handleFilter} filter_by={filter.filter_by}></TopBar>
    <LeaderBoard players={players}></LeaderBoard>
    <BottomBar sortHandler={handleSort} filter_by={filter.filter_by}/>
    </>
  )
}

export default App