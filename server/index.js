const express = require("express");

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter.js");
const todoRouter = require("./routes/todoRouter.js");

const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/todos", todoRouter);

// connection to the database
app.listen(5000, () => {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err));
});
