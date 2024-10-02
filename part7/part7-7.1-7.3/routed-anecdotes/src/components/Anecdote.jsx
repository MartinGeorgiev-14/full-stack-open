

const Anecdote = ({anecdote}) => {
    return (
        <div>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            <p>has {anecdote.votes} likes</p>
            <p>for more information see {anecdote.info}</p>
        </div>
    )

}

export default Anecdote;