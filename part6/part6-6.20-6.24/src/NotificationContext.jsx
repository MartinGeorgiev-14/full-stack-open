import { createContext, useContext, useReducer } from "react";


const notificationReducer = (state, action) => {
    switch(action.type){
        case 'MSG_SUCCESS':
            return {message: action.payload.message, class: 'success'}
        case 'MSG_ERROR':
            return {message: action.payload.message, class: 'error'}
        case 'MSG_WARNING':
            return {message: action.payload.message, class: 'warning'}
        case 'MSG_CLEAR':
            return {message: '', class: 'hidden'}
        default:
            return state
    }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
    return useContext(NotificationContext)[0]
}

export const useNotificationDispatcher = () => {
    return useContext(NotificationContext)[1]
}

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, {})

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}
