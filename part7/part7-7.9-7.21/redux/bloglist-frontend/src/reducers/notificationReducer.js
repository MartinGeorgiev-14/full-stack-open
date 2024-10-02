import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        text: '',
        type: 'hidden'
    },
    reducers:{
        setNotification: (state, action) => {
            return { text: action.payload.text, type: action.payload.type }
        },
        clearNotification: (state) => ({ text: '', type: 'hidden' })
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer