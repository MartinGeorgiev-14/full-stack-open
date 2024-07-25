const logger = require('./logger')
const jwt = require("jsonwebtoken")
const User = require("../models/user")


const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" })
    }
    else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message, message: "tupam"})
    }
    else if (error.name === "MongoServerError" && error.message.includes("E11000 duplicate key error")) {
        return response.status(400).json({ error: "username is already used" })
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {

    const authorization = request.get("authorization")
    
    if (authorization && authorization.startsWith("Bearer ")) {
        const replaced = authorization.replace("Bearer ", "");
        request.token = replaced
    }
    next()
}

const userExtractor = async (request, response, next) => {

    if (request.token){
        
        try{
            const decodedToken = jwt.decode(request.token, { complete: true });
            const decodeToken = await jwt.verify(request.token, process.env.SECRET);
            const user = await User.findById(decodeToken.id)

            if(user){
                request.user = user
            }
        }
        catch(error){
            if(error instanceof jwt.TokenExpiredError){
                return response.status(401).json({ error: "Token expired"})
            }
            else{
                console.log(error.message);
                return response.status(500).json({error: error.message})
            }
        }
    }
    else{
        return response.status(401).json({ error: "You must be logged in"})
    }
    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}