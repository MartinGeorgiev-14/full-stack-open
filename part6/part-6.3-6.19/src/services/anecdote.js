import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const response = await axios.post(baseUrl, {content, votes: 0})
    return response.data
}

const getById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const giveVote = async (id) => {
    const anecdote = await getById(id)
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const response = await axios.patch(`${baseUrl}/${id}`, updatedAnecdote)
    return response.data
}

export default { getAll, createNew, giveVote }