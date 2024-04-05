import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint16Array(anecdotes.length))

  const getRandomAnectode = () => {
    const max = anecdotes.length - 1
    const randomNum = Math.round(Math.random() * (max - 0) + 0)

    setSelected(randomNum)
  }

  function giveVote(index) {

    function vote() {
      const votesCopy = [ ...votes ]
      votesCopy[index] += 1

      setVotes(votesCopy)
    }

    return vote
  }
  
  const getMostPopular = () => {
    const highest = Math.max(...votes)
    const popular = votes.indexOf(highest)
    
    return anecdotes[popular]
  }

  return (
    <div>
      <h1>Anectode of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={giveVote(selected)}>vote</button>
      <button onClick={getRandomAnectode}>next anectode</button>
      <h1>Anectode with most votes</h1>
      <p>{getMostPopular()}</p>
    </div>
  )
}

export default App