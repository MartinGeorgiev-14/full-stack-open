import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'VOTE':
      const anecdoteToLike = state.find(a => a.id === action.payload.id)
      const updatedAnecdote = {...anecdoteToLike, votes: anecdoteToLike.votes + 1}
      const updatedState = state.map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote)
      return updatedState.sort((a, x) => x.votes - a.votes) 
    case 'CREATE':
      const newAnecdote = asObject(action.payload.content)
      return [...state, newAnecdote]
    default:
      return state
  }

  return state
}

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdotes(state, action){ 
      const anecdoteToLike = state.find(a => a.id === action.payload.id)
      const updatedAnecdote = {...anecdoteToLike, votes: anecdoteToLike.votes + 1}
      const updatedState = state.map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote)
      return updatedState.sort((a, x) => x.votes - a.votes) 
    },
    addAnecdote(state, action){
      return [...state, action.payload]
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const { addAnecdote, setAnecdotes, updateAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const result = await anecdoteService.getAll()
    dispatch(setAnecdotes(result))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const result = await anecdoteService.createNew(content)
    dispatch(addAnecdote(result))
  }
}

export const giveVote = (id) => {
  return async dispatch => {
    const result = await anecdoteService.giveVote(id)
    dispatch(updateAnecdotes(result))
  }
}

export default anecdotesSlice.reducer