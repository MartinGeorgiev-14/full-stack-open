import axios from "axios";
import blogsService from './blogs'

const baseUrl = "/api/login"


const login = async (creditentials) => {
    const response = await axios.post(baseUrl, creditentials)
    return response.data
}

const loginTest = async (creditentials) => {
    const response = await axios.post(baseUrl, creditentials)
    window.localStorage.setItem("loggedPerson", JSON.stringify(response.data))
    blogsService.setToken(response.data.token)
    return response.data
}

export default {login, loginTest}