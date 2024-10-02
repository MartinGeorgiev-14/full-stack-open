import blogService from "../services/blogs"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { addLike, deleteBlog, addComment } from "../reducers/blogsReducer"
import { setNotification } from "../reducers/notificationReducer"
import { useParams, useNavigate } from "react-router-dom"
import useField from '../hooks/useField'
import { TableContainer, Table, TableRow, TableCell, TableHead, Paper, TableBody, Box, Button, TextField, IconButton} from "@mui/material";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Grid from '@mui/material/Grid2'
import '../styles/default.css'



const Blog = () => {

  const id = useParams().id
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const blog = useSelector(state => state.blogs.content.find(b => b.id === id))
  const commentField = useField()
  if (blog === undefined) {
    return null;
  }

  const handleLike = async (event) => {
    event.preventDefault()

    try {
      const response = await blogService.updateLikesByOne(blog.id)
      dispatch(addLike(response))
    } catch (error) {
      dispatch(setNotification({ type: "error", message: error.message }))
    }

  }

  const handleDelete = async (event) => {
    event.preventDefault()

    try {
      if (!window.confirm("Are you sure you want to delete")) return

      const response = await blogService.deleteBlogById(blog.id)

      if (response === 200) {
        dispatch(deleteBlog(blog.id))
        navigate("/blogs")
      }

    } catch (error) {
      dispatch(setNotification({ type: "error", text: error.message }))
    }

  }

  const handleAddComment = async (event) => {
    event.preventDefault()

    try {
      const response = await blogService.addComment(blog.id, commentField.value)
      if(response.status === 200){
        commentField.clearValue()
        dispatch(setNotification({ type: "success", text: response.data.message}))
        dispatch(addComment({id: blog.id, comment: response.data.comment}))
      }
    } catch (error) {
      dispatch(setNotification({ type: "error", text: error.message }))
    }
  }

  const boxStyle = {
    width: 300,
    height: 'fit-content',
    p: '1rem'
  }

  return (
    <div>
      <Box component='section' sx={boxStyle}>
        <h2>{blog.title}</h2>
        <a href="#">{blog.url}</a>
        <p>{blog.author}</p>
        <p style={{fontWeight: 'bold'}}>Likes: {blog.likes}</p>
        {user.id === blog.user.id ?
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <div>
            <Button variant="contained" color="primary" type="submit" onClick={handleLike}>Like</Button>
            <IconButton aria-label="delete" color="primary" onClick={handleDelete}>
              <DeleteForeverRoundedIcon />
            </IconButton>
          </div>
          <div>
            <form onSubmit={handleAddComment}>
              <TextField color="primary" type="string" label="Add Comment" value={commentField.value} onChange={(data) => commentField.onChange(data)}></TextField>
            </form>
          </div>
        </div> : null}
      </Box>
      <Box component='section' sx={boxStyle}>
        <h3>Comments</h3>
        <TableContainer>
          <Table>
            <TableBody>
              {blog.comments.map(comment => (
                <TableRow key={comment}>
                  <TableCell>{comment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      
    </div>
    // <div className="div-blog">
    //   <div>{blog.url}</div>
    //   <div>{blog.author}</div>
    //   {user.id === blog.user.id ?
    //     <>
    //       <div className="div-likes">{blog.likes} <button type="submit" onClick={handleLike} className="like-btn">like</button></div>
    //       <form onSubmit={handleAddComment}>
    //         <label>Add comment</label>
    //         <input type="text" value={commentField.value} onChange={(data) => commentField.onChange(data)}/>
    //         <button type="submit">Add</button>
    //       </form>
    //       <button type="submit" onClick={handleDelete}>Delete</button>
    //     </> : user.id ?
    //       <div className="div-likes">{blog.likes} <button type="submit" onClick={handleLike} className="like-btn">like</button></div> : null}
    //   <h3>Comments</h3>
    //   <ul>
    //     {blog.comments.map(comment => {
    //       return (
    //         <li key={comment}>{comment}</li>
    //       )
    //     })}
    //   </ul>

    // </div>
  )
}


export default Blog