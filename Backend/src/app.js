const express = require("express")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())
app.use(cookieParser())

/*require all the routes here*/
const authrouter = require('./routes/auth.routes')

/*use all the routes here*/
app.use("/api/auth", authrouter)

module.exports = app