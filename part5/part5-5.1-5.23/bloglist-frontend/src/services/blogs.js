import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get("/api/displayBlogs")
  return request.then(response => response.data)
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

export default { getAll, setToken, postBlog, getBlogById, updateLikesByOne, deleteBlogById } 