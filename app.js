let express = require("express")
let bodyParser = require("body-parser")
let userRouter = require("./routes/user.router")
let creditRouter = require("./routes/credit.router")
const cookieParser = require("cookie-parser")
const cookieSession = require("cookie-session")
const cors = require('cors');

let app = express()
app.use(cors())
// Receive information in JSON format 
app.use(bodyParser.json())
// Activate use of cookies
app.use(cookieParser())
// Activate use of cookie sessions
app.use(cookieSession({
    secret: "aleatorio"
}))

// Config main route to server
app.get("/", (req,res)=>{
    res.send("respuesta desde /")
})

// Config route for /api/users
app.use("/api/users", userRouter)
// Config route for /api/credits
app.use("/api/credits", creditRouter)



module.exports = app