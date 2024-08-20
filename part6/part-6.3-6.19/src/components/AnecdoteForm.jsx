
import { useDispatch } from "react-redux"
import {addAnecdote, createAnecdote } from "../reducers/anecdoteReducer"
import { displayNotification } from '../reducers/notificationReducer'
import anecdoteService from "../services/anecdote"

const AnecdoteFrom = () => {
    const dispatch = useDispatch()

    const create = async (event) => {
        event.preventDefault()
        const content = event.target.content.value
        dispatch(createAnecdote(content))
        dispatch(displayNotification(`You created new anecdote"${content}"`))
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input type='text' name='content' /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteFrom