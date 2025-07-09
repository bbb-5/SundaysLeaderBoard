import axios from 'axios'
const baseUrl = './SundaysData.json'

const getData = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response)
}

export default {getData}