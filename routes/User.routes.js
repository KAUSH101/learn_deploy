const express= require("express")
const {UserModel} = require("../model/User.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require('dotenv').config()
const app = express()

const userRouter = express.Router()

app.use(express.json())
require('dotenv').config()

userRouter.post("/register",async(req,res)=>{
    const {name,pass,email} = req.body
    try {
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err) res.send(err)
            else {
                const user = new UserModel({name,email,pass:hash})
                await user.save()
                res.send({"msg":"user_register"})
            }
        })
       
    } catch (error) {
      console.log(error);
    }
    
})

userRouter.post("/login",async(req,res)=>{
    const{email,pass}=req.body
    
    try {
        const user = await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(pass,user[0].pass,(err,result)=>{
                if(result){
                    const token = jwt.sign({userID:user[0]._id},process.env.key)
                   
                    res.send({"msg":"Login Successfull","token":token})
                    

                }else{
                    res.send({"msg":"wrong credentials"})
                }
            })
           
        }else{
            res.send({"msg":"wrong credentials"})
        }
       
    } catch (error) {
        console.log(error);
    }
   
})

// userRouter.post("/login",async (req,res)=>{
//     const {email,pass}=req.body
//     try{
//         const user=await UserModel.find({email})
//         if(user.length>0){
//         bcrypt.compare(pass, hashed_pass, function(err, result) {
//         if(result){
//         const token = jwt.sign({ userID: user[0]._id }, process.env.key);
//         res.send({"msg":"Login Successfull","token":token})
//         } else {res.send("Wrong Credntials")}
//         });
//         } else {
//         res.send("Wrong Credntials")
//         }
//         } catch(err){
//         res.send("Something went wrong")
//         console.log(err)
//         }
//         })
        
        

userRouter.get("/data",(req,res)=>{
    const token = req.query.token
    jwt.verify(token,'masai',(err,decoded)=>{
        if(decoded){
            res.send("data is here")
        }else{
            res.send("wrong")
        }
    })

})
userRouter.get("/cart",(req,res)=>{
    const token = req.headers.authorization
    jwt.verify(token,'masai',(err,decoded)=>{
        if(decoded){
            res.send("data is here")
        }else{
            res.send("wrong")
        }
    })

})

module.exports={
    userRouter
}