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


  return (
    <>
    <h1>Sunday's Leaderboard</h1>
    <TopBar></TopBar>
    <LeaderBoard players={players}></LeaderBoard>
    <BottomBar></BottomBar>
    </>
  )
}

export default App
