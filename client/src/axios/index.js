// a JS file for link between server and client side

// importing axios for connection
const axios = require("axios").default;

// create axios for server URL
const HTTP = axios.create({
     baseURL: "http://localhost:5000/",
})

// getting user objects in the database for sign user

export const login = async (formData) => {
     return await HTTP.post("/users/signin", formData)
}

// setting user objects in the database for register user

export const register = async (formData) => {
     return await HTTP.post("/users/signup", formData)
}


// setting todo objects in the database
export const addTodotoDB = async (formData) => {
     return await HTTP.post("/todos/addtodo", formData)

}


// getting todo objects in the database
export const getTodotoDB = async () => {
     return await HTTP.get("/todos/gettodo")

}

export const deleteTodotoDB = async (formData) => {
     return await HTTP.post("/todos/deletetodo", formData)

}