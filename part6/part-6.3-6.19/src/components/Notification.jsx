import { useSelector, useDispatch } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'
import anecdote from '../services/anecdote'

const Notification = () => {
  let notification = useSelector(s => s.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (

    notification ? 
    <div style={style}>
      {notification}
    </div> : null

  )
}

export default Notification