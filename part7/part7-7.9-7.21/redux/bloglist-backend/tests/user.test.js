const {test, describe, beforeEach, after} = require("node:test")
const assert = require("node:assert")
const User = require("../models/user")
const app = require("../app")
const supertest = require("supertest")
const api = supertest(app)
const helper = require("../utils/api_helper")
const { default: mongoose } = require("mongoose")
const bcrypt = require("bcrypt")

describe("when there is atleast one user in the database", async function () {
    beforeEach(async  () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash("sekret", 10)
        const user = new User({ username: "testPowerUser", name: "ivan", passwordHash: passwordHash })
        await user.save()
    }) 


    test("creating a new user", async function () {

        const usersAtStart = await helper.usersInDb()

        const newUser = { username: "newUser", name: "newName", password: "newPass123@" }

        await api.post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })    

    test("creating existing user", async function () {

        const newUser = {username: "testPowerUser", name: "ivan", password: "123456aA@"}

        await api.post("/api/users")
            .send(newUser)
            .expect(400)
    })

    test("creating new user without password", async () => {
        const newUser = {username: "testuserprosto", name: "ivan"}

        await api.post("/api/users")
            .send(newUser)
            .expect(403)
    })

    
    test("creating new user with wrong password", async () => {
        const newUser = {username: "testuserprosto2", name: "ivan", password: "123"}

        await api.post("/api/users")
            .send(newUser)
            .expect(400)
    })

    test("creating new user without username", async () => {
        const newUser = {name: "ivan", password: "123456aA@"}

        await api.post("/api/users")
            .send(newUser)
            .expect(400)
    })

    test("creating new user without name", async () => {
        const newUser = {username: "testuserprosto3", password: "123456aA@"}

        await api.post("/api/users")
            .send(newUser)
            .expect(400)
    })
})

after( async () => {
    await mongoose.connection.close()
})
