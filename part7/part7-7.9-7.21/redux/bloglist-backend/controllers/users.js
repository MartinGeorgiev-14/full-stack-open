const bcrypt = require("bcrypt")
const userRouter = require("express").Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")

userRouter.get("/", async (request, response, next) => {
    const users = await User.find({}).populate("blogs", {title: 1, url: 1, likes: 1})
    response.json(users)
})

userRouter.post("/", async (request, response, next) => {
    const {username, name, password} = request.body


    if(!password){
       return response.status(403).json({error: "Enter password"})
    }
    else if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/.test(password)) {
       return response.status(400).json({error: "Password must contain at least 8 characters, including uppercase, lowercase, and a special character."})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    console.log("hashed password")
    const user = new User({
        username,
        name,
        passwordHash,
        blogs: []
    })

    try {
        const savedUser = await user.save()
        if(savedUser){
            response.status(201).json(savedUser)
        }
        else{
            response.status(400).json({error: "something went wrong"})
        }
       
    }
    catch (err) {
        next(err)
    }

})

module.exports = userRouter