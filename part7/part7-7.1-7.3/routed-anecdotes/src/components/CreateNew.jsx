import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index'

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    const navigate = useNavigate()

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000)
        props.setAnecdotes(props.anecdotes.concat(anecdote))
      }
    
  
    const handleSubmit = (e) => {
      e.preventDefault()
      addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      props.setNotification(`A new anecdote ${content} has been created`)
      navigate('/anecdotes')
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input name='content' value={content.value} onChange={(e) => content.onChange(e)} />
          </div>
          <div>
            author
            <input name='author' value={author.value} onChange={(e) => author.onChange(e)} />
          </div>
          <div>
            url for more info
            <input name='info' value={info.value} onChange={(e)=> info.onChange(e)} />
          </div>  
          <button>create</button>
          <button type='button' onClick={() => { content.reset(); author.reset(); info.reset() }}>reset</button>
        </form>
      </div>
    )
  
  }

  export default CreateNew;