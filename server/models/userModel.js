const { default: mongoose } = require("mongoose");


const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
},{ collection: "users" })
module.exports = mongoose.model("User", userSchema)

