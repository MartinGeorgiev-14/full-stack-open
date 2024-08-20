import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllAnecdotes, voteAnecdote} from './requests'
import { useNotificationDispatcher } from './NotificationContext'

const App = () => {

  const notificationDispatch = useNotificationDispatcher()
  const queryClient = useQueryClient()
  const giveVoteForAnecdote = useMutation({mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote)
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
    }})

  const handleVote = (anecdote) => {
    giveVoteForAnecdote.mutate(anecdote)

    notificationDispatch({type: 'MSG_SUCCESS', payload: { message : `You have voted for '${anecdote.content}'`}})
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAllAnecdotes,
    refetchOnWindowFocus: false 
  })

  if(result.isLoading){
    return <div>Loading...</div>
  }
  else if(result.error){
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data
  return (
    <div>
      <h3>Anecdote app</h3>
        <Notification />
      <AnecdoteForm queryClient={queryClient}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
