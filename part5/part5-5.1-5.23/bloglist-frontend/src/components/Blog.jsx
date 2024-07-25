import blogService from "../services/blogs"
import PropTypes from "prop-types"

const Blog = ({ blog, blogs, setBlogs, userData}) => {

  const handleLike = async (event) => {
    event.preventDefault()
 
    const response = await blogService.updateLikesByOne(blog.id)
    const updatedBlogs = blogs.map(b => {
      if (b.id === response.id) {
        return {...b, likes: response.likes}
      }
      return b
    })
    
    setBlogs(updatedBlogs)
  }

  const handleDelete = async (event) => {
    event.preventDefault()

    if(!window.confirm("Are you sure you want to delete")) return

    const response = await blogService.deleteBlogById(blog.id)
    
    if(response === 200){
      const updatedBlogs = blogs.filter(b => blog.id !== b.id)
      setBlogs(updatedBlogs)
    }
    
  }
    // console.log(userData.userId === blog.user.id)
  // console.log(userData.id === blog.user.id, userData.id ,blog.user.id  )
  return (
  <div className="div-blog">
    <div>{blog.url}</div>
    <div>{blog.author}</div>
    {userData.userId === blog.user.id ? 
    <>
      <div className="div-likes">{blog.likes} <button type="submit" onClick={handleLike} className="like-btn">like</button></div>
      <button type="submit" onClick={handleDelete}>Delete</button> 
    </> : userData.userId ? 
      <div className="div-likes">{blog.likes} <button type="submit" onClick={handleLike} className="like-btn">like</button></div> : null}
  </div>
  )  
}

// Blog.propTypes = {
//   blog: PropTypes.object.isRequired,
//   blogs: PropTypes.array.isRequired,
//   setBlogs: PropTypes.func.isRequired,
// }


export default Blog