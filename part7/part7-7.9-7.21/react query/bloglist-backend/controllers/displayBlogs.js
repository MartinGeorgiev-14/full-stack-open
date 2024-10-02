const blogsDisplayRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsDisplayRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs)
});

module.exports = blogsDisplayRouter