const {test, describe} = require("node:test")
const assert = require("node:assert")
const authorHelper = require("../utils/list_helper").mostBlogs

describe("Author total blogs", () => {
    test("of empty list of blogs", () => {
        const blogs = []
        const result = authorHelper(blogs)
        assert.strictEqual(result, null)
    })

    test("of a big list of blogs", () => {
        const blogs = [
            {
                title: "ddz",
                author: "Martin",
                url: "das",
                likes: 10
            },
            {
                title: "ddz2",
                author: "Martin",
                url: "da2s",
                likes: 10
            },
            {
                title: "ddz3",
                author: "Ivan",
                url: "das3",
                likes: 10
            },
            {
                title: "ddz4",
                author: "Martin",
                url: "das4",
                likes: 10
            }
        ]

        const result = authorHelper(blogs)

        assert.deepStrictEqual(result, {
            author: "Martin",
            blogs: 3
        })
    })
})