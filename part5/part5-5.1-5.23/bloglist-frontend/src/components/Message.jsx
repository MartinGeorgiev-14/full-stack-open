import "../styles/message.css";
import PropType from "prop-types"

const Message = (data) => {

   setTimeout(() => {
      if(data.message.text !== null){
         data.setMessage({text: null, type: "hidden"}) 
      }
    }, 5000);

   return(<div className={data.message.type + " common-message"}>{data.message.text}</div>)
}

Message.propTypes = {
   message: PropType.object.isRequired,
}

export default Message;