import axios from "axios"

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"

const getAll = () => {

    const response = axios.get(`${baseUrl}`)
    return response.then(response => response.data)
}


export default {
    getAll
}