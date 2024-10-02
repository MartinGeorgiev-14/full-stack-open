import "../styles/message.css";
import PropType from "prop-types"

const Message = (data) => {

   const text = data.message.notification.text
   const category = data.message.notification.category

   return(<div className={category + " common-message"}>{text}</div>)
}

export default Message;