const {test, describe} = require("node:test")
const assert = require("node:assert")
const mostLikesHelper = require("../utils/list_helper").mostLikes

describe("Most likes", () => {
    test("without any blogs", () => {
        const blogs = []

        const result = mostLikesHelper(blogs)
        assert.strictEqual(result, null)
    })

    test("with a lot of blogs", () => {
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

        const result = mostLikesHelper(blogs)
        assert.deepStrictEqual(result, {
            author: 'Martin',
            likes: 30
          })})
})