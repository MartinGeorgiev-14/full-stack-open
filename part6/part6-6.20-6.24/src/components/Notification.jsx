import { useContext, useEffect } from "react" 
import { useNotificationValue, useNotificationDispatcher } from '../NotificationContext'
import '../index.css'

const Notification = () => {

  const notification = useNotificationValue() 
  const notificationDispatch = useNotificationDispatcher() 

  useEffect(() => {

    if(!(Object.keys(notification).length === 0 || notification.class === 'hidden')) {
      setTimeout(() => {
        notificationDispatch({type: 'MSG_CLEAR'})
      }, 5 * 1000)
    }

  }, [notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: 'block'
  }


  if(Object.keys(notification).length === 0 || notification.class === 'hidden'){
    return null
  }

  return (
    
    <div style={style} className={notification.class}>{notification.message}</div>
  )
}

export default Notification
