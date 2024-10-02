const {test, describe} = require("node:test")
const assert = require("node:assert")
const favoriteHelper = require("../utils/list_helper").favoriteBlog

describe("Most liked blog", () => {
    test("of empty list of blogs", () => {
        const blogs = []
        const result = favoriteHelper(blogs)
        assert.deepStrictEqual(result, null)
    })

    test("of a bigger list of blogs", () => {
        const blogs = [
            {
                title: "title1",
                author: "author1",
                url: "url1",
                likes: 10
            },
            {
                title: "title2",
                author: "author2",
                url: "url2",
                likes: 20
            },
            {
                title: "title3",
                author: "author3",
                url: "url3",
                likes: 30
            },
            {
                title: "title4",
                author: "author4",
                url: "url4",
                likes: 30
            }
        ]

        const result = favoriteHelper(blogs)
        assert.deepStrictEqual(result, {
            title: "title4",
            author: "author4",
            url: "url4",
            likes: 30
        })
    })
})