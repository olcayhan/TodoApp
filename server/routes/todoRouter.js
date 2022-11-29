const express = require("express")
const Todo = require("../models/todoModel.js")
const router = express.Router()

router.post("/addtodo", async (req, res) => {
    try {
        console.log(req.body);
        const { name, important, complete, userID } = req.body

        const createdTodo = await Todo.create({
            name,
            important,
            complete,
            userID
        })
        return res.status(201).json(createdTodo)
    } catch (err) {
        console.log(err)
        return res.json({ message: err.message })
    }

})


router.get("/gettodo", async (req, res) => {
    try {
        const other = await Todo.find({ email: mail });
        return res.status(200).json({ other })

    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})


router.post("/deletetodo", async (req, res) => {
    try {

        const { } = req.body

        return res.status(200).json(req.body)

    } catch (err) {
        return res.status(400).json({ message: err.message })
    }

})
module.exports = router

