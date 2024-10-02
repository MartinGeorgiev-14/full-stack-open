
import { useEffect } from "react";

const Notification = (props) => {

    useEffect(() => {
        if(props.notification.length > 0) {
            setTimeout(() => {
                props.setNotification("")
            }, 5000)
        }

    }, [props.notification])


    return (
        <div>
            {props.notification}
        </div>
    )
}

export default Notification;