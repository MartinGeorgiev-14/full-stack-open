import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getAll = async () => {
  const response = await axios.get("/api/displayBlogs")
  return response.data
}

const postBlog = async (blog) => {

  try {
    const randomNum = Math.round(Math.random() * 100)
    blog.likes = randomNum

    const config = {
      headers: { Authorization: token }
    }
    
    const response = await axios.post(baseUrl, blog, config)
    return response.data
  }
  catch (error) {
    return { error: error.response.data.error }
  }
}

const updateLikesByOne = async (blogId) => {
  const config = {
    headers: { Authorization: token }
  }

  const blog = await getBlogById(blogId)

  const response = await axios.patch(`${baseUrl}/${blogId}`, { likes: blog.likes + 1 }, config)
  return response.data
}

const getBlogById = async (blogId) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(`${baseUrl}/${blogId}`, config)
  return response.data
}

const deleteBlogById = async (blogId) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.status
}

const getComments = async (blogId) => {
  const response = await axios.get(`/api/displayBlogs/${blogId}/comments`)
  return response.data
}

const addComment = async (blogId, comment) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.patch(`${baseUrl}/${blogId}/comments`, { comment }, config)
  return response
}

export default { getAll, setToken, postBlog, getBlogById, updateLikesByOne, deleteBlogById, getComments, addComment } 