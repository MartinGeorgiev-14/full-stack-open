const {test, describe} = require("node:test")
const assert = require("node:assert")
const likesHelper = require("../utils/list_helper").totalLikes


describe("Total likes", () => {
    test("of empty list is zero", () => {
        const blogs = []
        const result = likesHelper(blogs)
        assert.strictEqual(result, 0)
    }) 

    test("when list has only one blog equals the likes of that", () => {
        const blogs = [
            {
                title: "Roobin hood",
                author: "Petur",
                url: "www.google.com",
                likes: 20
            }
        ]

        const result = likesHelper(blogs)
        assert.strictEqual(result, 20)
    })

    test("of a bigger list is calculated right", () => {
        const blogs = [
            {
                title: "Roobin hood",
                author: "Petur",
                url: "www.google.com",
                likes: 20
            },
            {
                title: "Hello world",
                author: "Mark",
                url: "www.helloworld.com",
                likes: 15
            }
        ]

        const result = likesHelper(blogs)
        assert.strictEqual(result, 35)
    })
})