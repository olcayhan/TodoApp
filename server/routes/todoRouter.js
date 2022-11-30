const express = require("express");
const findByIdAndDelete = require("../models/todoModel.js");
const Todo = require("../models/todoModel.js")
const router = express.Router()



/* =========================== ADD TODO ======================== */

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

/* =========================== GET TODO ======================== */


router.post("/gettodo", async (req, res) => {
    try {

        const { id } = req.body
        const other = await Todo.find({ userID: id });
        return res.status(200).json({ other })

    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})



/* =========================== DELETE TODO ======================== */

router.post("/deletetodo", async (req, res) => {
    try {

        console.log(req.body);
        const { id } = req.body
        const result = await Todo.findByIdAndDelete({ _id: id });


        return res.status(200).json(result)

    } catch (err) {
        return res.status(400).json({ message: err.message })
    }

})

module.exports = router

