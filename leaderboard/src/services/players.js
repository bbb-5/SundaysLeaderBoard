import axios from 'axios'
const baseUrl = 'http://localhost:5173/lol.json'

const getPlayers = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response)
}

export default {getPlayers}
