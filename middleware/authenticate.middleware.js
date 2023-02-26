
const jwt=require("jsonwebtoken")
require('dotenv').config()
const authenticate = (req,res,next)=>{
  const token=req.headers.authorization
console.log(token);
if(token){
    const decoded = jwt.verify(token,process.env.key)
if(decoded){
        const userID = decoded.userID
        console.log(decoded);
        req.body.userID=userID
        next()
        } else {
        res.send("Please Login1")   
        }
} else {
res.send("Please Login2")
}  }

module.exports={
authenticate
}