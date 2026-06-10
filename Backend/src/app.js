const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const multer = require("multer")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

/*require all the routes here*/
const authrouter = require('./routes/auth.routes')
const interviewRouter = require('./routes/interview.routes')

/*use all the routes here*/
app.use("/api/auth", authrouter)
app.use("/api/interview", interviewRouter)

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        const message =
            error.code === "LIMIT_FILE_SIZE"
                ? "Resume PDF must be 5MB or smaller."
                : error.message

        return res.status(400).json({ message })
    }

    if (error.message === "Only PDF resume uploads are supported.") {
        return res.status(400).json({
            message: error.message
        })
    }

    next(error)
})

module.exports = app
