const express = require("express")
const authcontroller = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const authrouter = express.Router()

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authrouter.post('/register', authcontroller.registerUserController)

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */

authrouter.post('/login', authcontroller.loginUserController)

/**
 * @route GET /api/auth/logout
 * @desc clear the token from the cookie and add the token in blacklist
 * @access public
 */

authrouter.get('/logout', authcontroller.logoutUserController) 

/**
 * @route GET /api/auth/get-me
 * @desc get the details of the logged in user, expects token in the cookie
 * @access private
 */

authrouter.get('/get-me',authMiddleware.authUser,authcontroller.getMeController)

module.exports = authrouter