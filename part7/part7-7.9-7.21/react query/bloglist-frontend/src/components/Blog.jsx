import PropTypes from "prop-types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import blogService from '../services/blogs'

const Blog = ({blog, user}) => {

  const queryClient = useQueryClient()

  const likeMutator = useMutation({
    mutationFn: blogService.updateLikesByOne,
    onSuccess: (response) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const updatedBlogs = blogs.map(b => {
        if (b.id === response.id) {
          return {...b, likes: response.likes}
        }
        return b
      })
      queryClient.setQueryData(['blogs'], updatedBlogs)
    }})

  const deleteMutator = useMutation({
    mutationFn: blogService.deleteBlogById,
    onSuccess: (response) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const updatedBlogs = blogs.filter(b => b.id !== response.id)
      queryClient.setQueryData(['blogs'], updatedBlogs)
    }})

  const handleLike = async (event) => {
    event.preventDefault()
 
    likeMutator.mutate(blog.id)
  }

  const handleDelete = async (event) => {
    event.preventDefault()

    if(!window.confirm("Are you sure you want to delete")) return

    deleteMutator.mutate(blog.id)
  }
  

  return (
  <div className="div-blog">
    <div>{blog.url}</div>
    <div>{blog.author}</div>
    {user.state.userId === blog.user.id ? 
    <>
      <div className="div-likes">{blog.likes} <button type="submit" onClick={handleLike} className="like-btn">like</button></div>
      <button type="submit" onClick={handleDelete}>Delete</button> 
    </> : user.state.userId ? 
      <div className="div-likes">{blog.likes} <button type="submit" onClick={handleLike} className="like-btn">like</button></div> : null}
  </div>
  )  
}



export default Blog