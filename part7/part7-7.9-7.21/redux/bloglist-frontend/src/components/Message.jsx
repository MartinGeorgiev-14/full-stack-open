import "../styles/message.css";
import PropType from "prop-types"
import { useSelector, useDispatch } from "react-redux"
import { clearNotification } from "../reducers/notificationReducer";

const Message = (data) => {

   const dispatch = useDispatch()
   const notifiaction = useSelector(data => data.notification)
  
   setTimeout(() => {
      if(notifiaction.text !== ''){
         dispatch(clearNotification())
      }
    }, 5000)

   return(<div className={notifiaction.type + " common-message"}>{notifiaction.text}</div>)
}


export default Message;