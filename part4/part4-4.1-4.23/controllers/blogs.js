const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken")


blogsRouter.get('/', async (request, response, next) => {

  try {
    const result = await Blog.find({}).populate("user", { username: 1, name: 1 })

    if (result) {
      response.status(200).json(result)
    }
    else {
      response.status(404).json({ error: "no blogs found" })
    }
  } catch (error) {
    next(error)
  }

})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = request.user
  
  try {

    if (!user.id) {
      return response.status(401).json({ error: "unauthorized" })
    }

    const blog = new Blog({
      title: body.title,
      url: body.url,
      likes: body.likes || 0,
      user
    })

    console.log(user)

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)

  } catch (error) {
    next(error)
  }

})


blogsRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id
  const user = request.user

  try {

    if (!user.id) {
      return response.status(401).json({ error: "unauthorized" })
    }
    
    const blog = await Blog.findById(id)

    if (!blog) {
      return response.status(404).json({ error: "blog was not found" })
    }
    else if (blog.user.toString() === user.id) {
      // Should use blog.delete() instead of this. But it shat itself for some reason.
      await Blog.findByIdAndDelete(id)
      return response.status(200).json({ message: "blog was deleted successfully" })
    }
    else {
      return response.status(403).json({ error: "you are not the author of this blog" })
    }
  }
  catch (error) {
    next(error)
  }
})

blogsRouter.patch("/:id", async (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes || 0,
  }

  try {
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

    if (result) {
      response.json(result)
    }
    else {
      response.status(404).end()
    }

  } catch (error) {
    next(error)
  }
})

blogsRouter.get("/:id", async (request, response, next) => {
  const id = request.params.id

  try {
    const result = await Blog.findById(id)

    if (result) {
      response.status(200).json(result)
    }
    else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }

})


module.exports = blogsRouter
