let express = require("express")
let bodyParser = require("body-parser")
let userRouter = require("./routes/user.router")

let app = express()
// Receive information in JSON format 
app.use(bodyParser.json())

// Config main route to server
app.get("/", (req,res)=>{
    res.send("respuesta desde /")
})

// Config route for /api/users
app.use("/api/users", userRouter)


module.exports = app