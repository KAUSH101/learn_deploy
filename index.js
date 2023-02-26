const express= require("express")
const {connection} = require("./config/db")

const {userRouter} = require("./routes/User.routes")
const {noteRouter} = require("./routes/Note.route")

const jwt = require("jsonwebtoken")
const { authenticate } = require("./middleware/authenticate.middleware")
const cors = require("cors")
require('dotenv').config()
const app = express()



app.use(express.json())
  app.use(cors({
    origin:"*"
})) 




app.get("/",(req,res)=>{   
   
   
    res.send("home page")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)








app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("running");
    } catch (error) { 
        console.log(error);
    }
})