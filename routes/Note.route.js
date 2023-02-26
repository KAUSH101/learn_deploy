const express = require("express")
const { UserModel } = require("../model/User.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { NoteModel } = require("../model/Note.model")

const app = express()

const noteRouter = express.Router()

app.use(express.json())
require('dotenv').config()

noteRouter.get("/", async (req, res) => {
   
        const notes = await NoteModel.find({userID:req.body.userID}) 
        res.send(notes)
    
  
})
noteRouter.post("/create", async (req, res) => {
    const payload = req.body
    const note = new NoteModel(payload)
    await note.save()
    res.send("msg_created")

})
noteRouter.delete("/delete/:id", async (req, res) => {

    const id = req.params.id

    const note = await NoteModel.findOne({ "_id": id })
    const userID_in_note = note.userID
    const userID_making_req = req.body.userID
    try {
        if (userID_making_req !== userID_in_note) {
            res.send("not authorized")
        } else {
            await NoteModel.findByIdAndDelete({ "_id": id })
            res.send("deleted")
        }

    } catch (error) {
        console.log(error);
        res.send("error")  
    }


})


noteRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body
    const id = req.params.id

    const note = await NoteModel.findOne({ "_id": id })
    const userID_in_note = note.userID
    const userID_making_req = req.body.userID

 
    try {
        if (userID_making_req !== userID_in_note) {
            res.send("not authorized")
        } else {
            await NoteModel.findByIdAndUpdate({ "_id": id }, payload)
            res.send("updated")
            console.log(userID_in_note, userID_making_req);
        }
    } catch (error) {
        console.log(error);
        res.send("error")
    }


})

module.exports = {
    noteRouter
}