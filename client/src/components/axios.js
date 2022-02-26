import axios from 'axios'

const instance = axios.create({
    baseURL: " https://whatsappbackend1.herokuapp.com"
})

export default instance