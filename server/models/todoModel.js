const { default: mongoose } = require("mongoose");


const todoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    important: {
        type: Boolean,
        required: true
    },
    complete: {
        type: Boolean,
        required: true
    },
    userID: {
        type: String,
        required: true
    }

}, { collection: "todos" })
module.exports = mongoose.model("Todo", todoSchema)

