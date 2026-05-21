const UserModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

/**
 * @name registerUserController
 * @desc Register a new user,expects username,email and password in the request body
 * @access Public
 */

async function registerUserController(req, res){
    const {username,email,password} = req.body

if(!username || !email || !password){
    return res.status(400).json({message : "please provide username, email and password"})
  }

const isUserAlreadyExists = await UserModel.findOne({
    $or: [ {username},{email}]
})

if(isUserAlreadyExists){
    return res.status(400).json({message : "user with this email or username already exists"}) 
 }
 
 const hash = await bcrypt.hash(password, 10)

 const User = await UserModel.create({
    username,
    email,
    password : hash
 })

 const token = jwt.sign(
    {id : User._id, username : User.username},
    process.env.JWT_SECRET,
    {expiresIn : "1d"}
 )

 res.cookie("token", token)

 res.status(201).json({
    message : "user registered successfully",
    user : {
        id : User._id,
        username : User.username,
        email : User.email
    }
 })


}

/**
 * @name loginUserController
 * @desc Login a user, expects email and password in the request body
 * @access Public
 */

async function loginUserController(req, res){
    const {email,password} = req.body
   
    const user = await UserModel.findOne({email})

    if(!user){
        return res.status(400).json({message : "invalid email or password"})
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect){
        return res.status(400).json({message : "invalid email or password"})
    }

    const token = jwt.sign(
        {id : user._id, username : user.username},
        process.env.JWT_SECRET,
        {expiresIn : "1d"}
     )

        res.cookie("token", token)
        res.status(200).json({
            message : "user logged in successfully",
            user : {
                id : user._id,
                username : user.username,
                email : user.email
            }
        })
}

/**
 * @name logoutUserController
 * @desc clear the token from the cookie and add the token in blacklist
 * @access public
 */

async function logoutUserController(req, res){
    const token = req.cookies.token
    if(token){
        await tokenBlacklistModel.create({token})
    }

    res.clearCookie("token")
    res.status(200).json({message : "user logged out successfully"})
}

/**
 * @name getMeController
 * @desc get the details of the logged in user.
 * @access private
 */

async function getMeController(req, res){
    const user = await UserModel.findById(req.user.id)
 
    res.status(200).json({
        message : "user details fetched successfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email
        }
    })
}

module.exports = { 
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}