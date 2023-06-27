const express = require("express");
const Todo = require("../models/todoModel.js");
const router = express.Router();

/* =========================== ADD TODO ======================== */

router.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    const { name, important, complete, userID } = req.body;

    const createdTodo = await Todo.create({
      name,
      important,
      complete,
      userID,
    });
    return res.status(201).json(createdTodo);
  } catch (err) {
    console.log(err);
    return res.json({ message: err.message });
  }
});

/* =========================== GET TODO ======================== */

router.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const other = await Todo.find({ userID: id });
    return res.status(200).json({ other });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

/* ===================== TOGGLE TODO ================== */
router.post("/toggle", async (req, res) => {
  try {
    const { id } = req.body;

    const todo = await Todo.findOne({ _id: id });

    const other = await Todo.updateOne(
      { _id: id },
      {
        $set: {
          complete: !todo.complete,
        },
      }
    );
    return res.status(200).json({ other });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

/* ===================== important TODO ================== */
router.post("/important", async (req, res) => {
  try {
    const { id } = req.body;

    const todo = await Todo.findOne({ _id: id });
    const other = await Todo.updateOne(
      { _id: id },
      {
        $set: {
          important: !todo.important,
        },
      }
    );
    return res.status(200).json({ other });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

/* =========================== DELETE TODO ======================== */

router.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;

    // console.log(todo)
    const result = await Todo.deleteMany({ userID: id, complete: true });
    console.log(result);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
