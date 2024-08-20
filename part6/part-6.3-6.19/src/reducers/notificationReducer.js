import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action){
            return action.payload
        },
        clearNotification(state) {
            return null
        }
    } 
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const displayNotification = (content) => {
    return async dispatch => {
        console.log(content)
        dispatch(setNotification(content))
        setTimeout(() => { dispatch(clearNotification()) }, 5000)
    }
}

export default notificationSlice.reducer