import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useDispatch , useSelector } from 'react-redux'
import anecdoteService from './services/anecdote'
import { setAnecdotes, initializeAnecdotes } from './reducers/anecdoteReducer'
import { useEffect } from 'react'


const App = () => {

  const dispatch = useDispatch()

  useEffect( () => {
    anecdoteService.getAll().then((result) => {
      dispatch(initializeAnecdotes())
    })
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App