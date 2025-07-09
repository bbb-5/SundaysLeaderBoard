import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Button from './components/Button'
import TopBar from './components/TopBar'
import LeaderBoard from './components/LeaderBoard'
import BottomBar from './components/BottomBar'
import playerService from './services/players'
import dataService from './services/data'
import Player from './components/Player'

function App() {
  const [players, setPlayers] = useState([])
  const [data, setData] = useState([])
  
  useEffect(() => {
    dataService.getData().then((jsonData) => {
      setData(jsonData.data)
      console.log(jsonData.data)
      setPlayers(jsonData.data.Players)
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

  return (
    <>
    <h1>Sunday's Leaderboard</h1>
    <TopBar reverseHandler={handleReverse} ></TopBar>
    <LeaderBoard players={players}></LeaderBoard>
    <BottomBar sortHandler={handleSort}/>
    </>
  )
}

export default App
