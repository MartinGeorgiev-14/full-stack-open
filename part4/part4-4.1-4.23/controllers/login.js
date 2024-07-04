const loginRouter = require('express').Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

loginRouter.post("/", async (request, response, next) => {
    const {username, password} = request.body
    
    const user = await User.findOne({username})

    const correctPass = user === null ? false : await bcrypt.compare(password, user.passwordHash) 

    if(!(user && correctPass)) {
        return response.status(401).json({error: "Invalid credentials"})
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60})

    response.status(200).json(token, user.username, user.name)
})

module.exports = loginRouter;