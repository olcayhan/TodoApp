// a JS file for link between server and client side

// importing axios for connection
const axios = require("axios").default;

// create axios for server URL
const HTTP = axios.create({
     baseURL: "http://localhost:5000/",
})

// getting user objects in the database for sign user

export const logintoDB = async (formData) => {
     return await HTTP.post("/users/signin", formData)
}

// setting user objects in the database for register user

export const registertoDB = async (formData) => {
     return await HTTP.post("/users/signup", formData)
}

export const getUsertoDB = async (formData) => {
     return await HTTP.post("/users/signup", formData)
}


// setting todo objects in the database
export const addTodotoDB = async (formData) => {
     return await HTTP.post("/todos/addtodo", formData)

}


// getting todo objects in the database
export const getTodotoDB = async (id) => {
     return await HTTP.post("/todos/gettodo", { id })

}

// getting todo objects in the database
export const toggleTodotoDB = async (id) => {
     return await HTTP.post("/todos/toggletodo", { id })

}

export const importantTodotoDB = async (id) => {
     return await HTTP.post("/todos/importanttodo", { id })
}

export const deleteTodotoDB = async (id) => {
     return await HTTP.post("/todos/deletetodo", {id})

}