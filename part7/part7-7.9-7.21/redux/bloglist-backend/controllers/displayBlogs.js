const blogsDisplayRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsDisplayRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs)
});

blogsDisplayRouter.get('/:id/comments', async (request, response, next) => {
  const id = request.params.id

  try {
    const blog = await Blog.findById(id)

    if(!blog){
      return response.stats(404).json({message: '404 Not Found'})
    }
    else if(!blog.comments){
      return response.status(200).json({message: 'No comments found'})
    }

    return response.status(200).json(blog.comments)

  } catch (error) {
    next(error)
  }
})

module.exports = blogsDisplayRouter