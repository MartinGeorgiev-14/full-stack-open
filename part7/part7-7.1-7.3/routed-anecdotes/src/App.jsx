import { useState } from 'react'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  console.log(anecdotes)

  const match = useMatch('/anecdotes/:id')
  const found = match ? anecdotes.find(a => a.id === Number(match.params.id)) : null

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>

      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} setAnecdotes={setAnecdotes} />
      <Notification notification={notification} setNotification={setNotification}/>
      <Routes>
        <Route path='/anecdotes' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/createNew' element={<CreateNew anecdotes={anecdotes} setAnecdotes={setAnecdotes} setNotification={setNotification}/>} />
        <Route path='/About' element={<About />} />
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={found} />} />
        {/* <Route path='/' element={<App/>}/> */}
      </Routes>

      <Footer />
    </div>
  )
}

export default App
