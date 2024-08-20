import axios from 'axios'

const baseUrl = 'http://localhost:3001'

export const getAllAnecdotes = () => {
    return axios.get(`${baseUrl}/anecdotes`).then(res => res.data)
}

export const createAnecdote = async (newAnecdote) => {
    const request = await axios.post(`${baseUrl}/anecdotes`, newAnecdote).then(res => res.data)
    return request
}

export const voteAnecdote = (anecdote) => {
    return axios.put(`${baseUrl}/anecdotes/${anecdote.id}`, {...anecdote, votes: anecdote.votes + 1}).then(res => res.data)
}

