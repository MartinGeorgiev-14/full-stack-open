import { useDispatch, useSelector } from "react-redux"
import { giveVote } from "../reducers/anecdoteReducer"
import { displayNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({anecdote, filter}) => {
        if(filter === "ALL"){
            return anecdote
        }
        return anecdote.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    })

    const vote = (anecdote) => {
        dispatch(giveVote(anecdote.id))
        dispatch(displayNotification(`you voted for "${anecdote.content}"`))
    }

    return(
        <div>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList