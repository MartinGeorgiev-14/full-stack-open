import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUser: (state, action) => {
            return {
                username: action.payload.username,
                name: action.payload.name,
                id: action.payload.userId,
                blogs: action.payload.blogs
            }
        },
        clearUser: (state) => {
            return {}
        }
    }
})


export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer;