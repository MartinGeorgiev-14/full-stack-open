import { useReducer, useEffect } from "react";

const useNotification = () => {
    const [notification, setNotification] = useReducer((state, action) => {
        switch (action.type) {
            case 'SET_NOTIFICATION':
                return {text: action.payload.text, category: action.payload.category};
            case 'CLEAR_NOTIFICATION':
                return {text: null, category: 'hidden'}
            default:
                return state;
        }
    }, { text: null, category: 'hidden' });

    setTimeout(() => {
        if(notification.text !== null){
            clearNotification() 
        }
      }, 5000);

    const setNotificationMessage = (text, category) => {
        setNotification({type: 'SET_NOTIFICATION', 
            payload: {text: text, category: category}})
    }

    const clearNotification = () => {
        setNotification({type: 'CLEAR_NOTIFICATION'})
    }

    return { notification, setNotification, setNotificationMessage, clearNotification }
}

export default useNotification;