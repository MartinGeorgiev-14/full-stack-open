const { test, after, beforeEach, describe } = require("node:test")
const mongoose = require("mongoose")
const assert = require("node:assert")
const supertest = require("supertest")
const app = require("../app.js")
const api = supertest(app)
const Blog = require("../models/blog.js")
const helper = require("../utils/api_helper.js")

describe("Api tests", () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
    
        const blogObjects = helper.initialBlogs
            .map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })
    
    
    // test("a get request for all blogs", async () => {
    //     const response = await api.get("/api/blogs")
    //         .expect(200)
    //         .expect("Content-Type", "application/json; charset=utf-8")
    
    //     assert.strictEqual(response.body.length, helper.initialBlogs.length)
    
    // })
    
    // test("does contain id prop", async () => {
    //     const response = await api.get("/api/blogs")
    //         .expect(200)
    //         .expect("Content-Type", "application/json; charset=utf-8")
    
    //     assert.strictEqual(response.body.id, helper.initialBlogs.id)
    // })
    
    test("a post request for a blog", async () => {
        const newBlog = {
            title: "New blog",
            author: "New author",
            url: "New url",
            likes: 0
        }

        const user = {
            username: "geq13",
            password: "123456aA@"
        }

        const token = await api.post("/api/login")
            .send(user)
            .expect(200)    
    
        
        await api.post("/api/blogs")
            .send(newBlog)
            .set("Authorization", `Bearer ${token.text}`)
            .expect(201)
            .expect("Content-Type", "application/json; charset=utf-8")

    
        const blogsInDb = await helper.blogsInDb()
        delete blogsInDb[blogsInDb.length - 1].id
    
        assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1)
        assert.deepStrictEqual(blogsInDb[blogsInDb.length - 1], newBlog)
    })
    
//     test("a post request for checking likes", async () => {
//         const newBlog = {
//             title: "New blog",
//             author: "New author",
//             url: "New url",
//         }
    
//         await api.post("/api/blogs")
//             .send(newBlog)
//             .expect(201)
//             .expect("Content-Type", "application/json; charset=utf-8")
    
//         const blogsInDb = await helper.blogsInDb()
    
//         assert.strictEqual(blogsInDb[blogsInDb.length - 1].likes, 0)
//     })
    
//     test("a post requests with missing props", async () => {
//         const { newBlog1, newBlog2 } = [
//             {
//                 title: "New blog",
//                 author: "New author",
//             },
//             {
//                 author: "New author",
//                 url: "New url",
//             }
//         ]
    
//         await api.post("/api/blogs")
//            .send(newBlog1)
//            .expect(400)
//            .expect("Content-Type", "application/json; charset=utf-8")
        
//         await api.post("/api/blogs")
//             .send(newBlog2)
//             .expect(400)
//             .expect("Content-Type", "application/json; charset=utf-8")
//     })

//     test("a deletion of a blog", async () => {
//         const blogsInDb = await helper.blogsInDb()
//         const lastBlog = blogsInDb[blogsInDb.length - 1]

//         await api.delete(`/api/blogs/${lastBlog.id}`)
//            .expect(204)

//         const currentBlogsInDb = await helper.blogsInDb()

//         assert.strictEqual(currentBlogsInDb.length, helper.initialBlogs.length - 1)
//         assert(!currentBlogsInDb.includes(lastBlog))
//     })
// })

// test("of updating likes", async () => {
//     const updatedLikes = {likes: 69}
//     const blogsInDb = await helper.blogsInDb()
//     const lastBlog = blogsInDb[blogsInDb.length - 1]

//     const patchedBlog = await api.patch(`/api/blogs/${lastBlog.id}`)
//         .send(updatedLikes)
//         .expect(200)
//         .expect("Content-Type", "application/json; charset=utf-8")

//     assert(!blogsInDb.includes(patchedBlog.body))
//     assert.strictEqual(patchedBlog.body.likes, 69)
})


after(async () => {
    await mongoose.connection.close()
    console.log("closed connection")
})