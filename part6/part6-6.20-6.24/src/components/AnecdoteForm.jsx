import { createAnecdote } from "../requests"
import { useMutation } from "@tanstack/react-query"
import { useNotificationDispatcher } from "../NotificationContext"

const AnecdoteForm = (prop) => {

  const notificationDispatch = useNotificationDispatcher()

  const createNewAnecdote = useMutation({ mutationFn: createAnecdote, onSuccess: (newAnecdote) => {
    prop.queryClient.invalidateQueries({queryKey: ['anecdotes']})
    notificationDispatch({type: 'MSG_SUCCESS', payload: { message: `A new anecdote was successfully created '${newAnecdote.content}'`}})
  }, onError: (err) => {
    notificationDispatch({ type: 'MSG_ERROR', payload: { message: `${err.response.data.error}`}})
  }})

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createNewAnecdote.mutate({content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
