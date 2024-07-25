const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
    {
        "title": "Roobin hood",
        "author": "Petur",
        "url": "www.google.com",
        "likes": 20
    },
    {
        "title": "Roobin hood2",
        "author": "Petur2",
        "url": "www.google.com2",
        "likes": 202
    },
    {
        "title": "Robin hood69",
        "author": "Petur69",
        "url": "www.google.com69",
        "likes": 2069
    }
]

const blogsInDb = async () => {

    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    blogsInDb, initialBlogs, usersInDb
}

