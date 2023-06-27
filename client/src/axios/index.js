// a JS file for link between server and client side

// importing axios for connection
const axios = require("axios").default;

// create axios for server URL
const HTTP = axios.create({
  baseURL: "https://todoapp-backend-rlvk.onrender.com/",
});

// getting user objects in the database for sign user

export const logintoDB = async (formData) => {
  return await HTTP.post("/users/login", formData);
};

// setting user objects in the database for register user

export const registertoDB = async (formData) => {
  return await HTTP.post("/users/register", formData);
};
