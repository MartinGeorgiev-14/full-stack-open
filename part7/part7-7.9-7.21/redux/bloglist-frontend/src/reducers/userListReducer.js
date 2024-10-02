import { createSlice } from "@reduxjs/toolkit";
import userListService from '../services/user'

const userListSlice = createSlice({
    name: 'userList',
    initialState: await userListService.getAllUsers(),
    reducers: {
    }
})

export default userListSlice.reducer