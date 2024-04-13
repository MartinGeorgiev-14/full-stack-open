import axios from 'axios'
const baseUrl = 'http://localhost:3000/persons'


const getAll = () => {
    const response = axios.get(baseUrl)
    return response.then(response => response.data)
}

const create = newObj => {
    const response = axios.post(baseUrl, newObj)
    return response.then(response => response.data)
}

const remove = id => {
    const response = axios.delete(`${baseUrl}/${id}`)
    return response.then(response => response.data)
}

const update = (id, newObj) => {
    const response = axios.put(`${baseUrl}/${id}`, newObj)
    return response.then(response => response.data)
}

export default {
    getAll,
    create,
    remove,
    update
}