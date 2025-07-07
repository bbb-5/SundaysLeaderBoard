import { useState, useEffect } from 'react'
import './App.css'
import Button from './components/Button'
import TopBar from './components/TopBar'
import LeaderBoard from './components/LeaderBoard'
import BottomBar from './components/BottomBar'
import playerService from './services/players'
import Player from './components/Player'

function App() {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    playerService.getPlayers().then((allPlayers) => {
      setPlayers(allPlayers.data)
    })
  }, [])

  const handleSort = (sortFunction) => {
    const newPlayers = [...players].sort(sortFunction)
    setPlayers(newPlayers)
  }

  return (
    <>
    <h1>Sunday's Leaderboard</h1>
    <TopBar></TopBar>
    <LeaderBoard players={players}></LeaderBoard>
    <BottomBar sortHandler={handleSort}/>
    </>
  )
}

export default App
