import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import { getAll } from '../services/blogs'

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: {sortType: true, content: []},
    reducers: {
        setBlogs: (state, action) => { 
            return {...state, content: action.payload}
        },
        changeSort: (state) => {
            return {...state, sortType: !state.sortType}
        },
        addBlog: (state, action) => {
            return {...state, content: [...state.content, action.payload]}
        },
        addLike: (state, action) => {
            const updatedContent = state.content.map(b => {
                if(b.id === action.payload.id){
                    return {...b, likes: action.payload.likes}
                }
                return b
            })

            return { ...state, content: updatedContent}
        },
        deleteBlog: (state, action) => {            
            return { ...state, content: state.content.filter(b => b.id !== action.payload) }
        },
        addComment: (state, action) => {
            const updatedContent = state.content.map(b => {
                if(b.id === action.payload.id){
                    return {...b, comments: [...b.comments, action.payload.comment]}
                }
            })
            return {...state, content: updatedContent}
        }
    },
    
})



export const { setBlogs, changeSort, addBlog, addLike, deleteBlog, addComment } = blogsSlice.actions
export default blogsSlice.reducer