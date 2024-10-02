import {useState} from "react"
import blogService from "../services/blogs"
import { setNotification } from "../reducers/notificationReducer" 
import PropType from "prop-types"
import { useSelector, useDispatch } from "react-redux"
import { setBlogs, addBlog } from "../reducers/blogsReducer"
import useField from '../hooks/useField'
import { Button, TextField } from "@mui/material"

const BlogCreator = ({setMessage}) => {

    const dispatch = useDispatch()
    const title = useField()
    const url = useField()
    const author = useField()

    const blogForm = async (data) => {
        data.preventDefault()
    
        try {
            if(!(title.value && url.value && author.value)){
                dispatch(setNotification({text: "Please fill all the fields", type: "error"}))
                return
            }
    
            const blog = {
                title: title.value,
                url: url.value,
                author: author.value,
                likes: 0
            }
    
            const result = await blogService.postBlog(blog)
            
            dispatch(addBlog(result))
            dispatch(setNotification({text: `A new blog "${result.title}" by ${result.author} has been created`, type: "success"}))
            title.clearValue()
            url.clearValue()
            author.clearValue()

        } catch (error) {
            dispatch(setNotification({text: `Error saving blog ${result.error}`, type: "error"}))
        }
    }

    const style = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginTop: '0.5rem',   
    }
    
    return(
        <form onSubmit={blogForm} style={style}>
            <div>
                <TextField label="Title" onChange={(data) => title.onChange(data)}></TextField>
            </div>
            <div>
                <TextField label="URL" onChange={(data) => url.onChange(data)}></TextField>
            </div>
            <div>
                <TextField label="Author" onChange={(data) => author.onChange(data)}></TextField>
            </div>
            <div>
                <Button variant="contained" color="primary" type="submit">Save</Button>
                {/* <button type="input" className="save-btn">Save</button> */}
            </div>
        </form>
    )
}

// BlogCreator.propTypes = {
//     blogs: PropType.array.isRequired,
//     setBlogs: PropType.func.isRequired,
//     setMessage: PropType.func.isRequired
// }

export default BlogCreator;