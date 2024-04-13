import axios from "axios"

const api_key = import.meta.env.VITE_SOME_KEY

const example = "weather?lat={lat}&lon={lon}&appid={API key}"
const baseUrl = "https://api.openweathermap.org/data/2.5"

const getWeather = (lat, lon) => {
    const response = axios.get(`${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    return response.then(response => response.data)
}

export default {
    getWeather
}