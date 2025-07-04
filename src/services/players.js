import axios from 'axios'
const baseUrl = './players.json'

const getPlayers = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response)
}

export default {getPlayers}
