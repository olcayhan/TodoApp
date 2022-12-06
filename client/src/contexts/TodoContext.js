import React, { useContext, useEffect, useState } from "react";
import { addTodotoDB, getTodotoDB, logintoDB, registertoDB, toggleTodotoDB, deleteTodotoDB, importantTodotoDB } from '../axios'


const TodoContext = React.createContext();



export function useTodo() {
    return useContext(TodoContext)
}


export const TodoProvider = ({ children }) => {

    const [signin, setSignin] = useState(localStorage.getItem("user"));
    const [userIDtoDB, setUserIDtoDB] = useState(localStorage.getItem("userID"));
    const [todos, setTodos] = useState([])



    // setting user to take data
    useEffect(() => {
        if (!signin) {
            setUserIDtoDB()
        }

        getTodotoDB(userIDtoDB)
            .then((res) => {
                setTodos([...res.data.other])
            })
            .catch((err) => { console.log(err.message) });
    }, [signin, userIDtoDB])


    useEffect(() => {
        getTodotoDB(userIDtoDB)
            .then((res) => {
                setTodos([...res.data.other])
            })
            .catch((err) => { console.log(err.message) });
    }, [todos, userIDtoDB])


    // ======================= LOGIN =================================
    function loginUser(formData) {
        logintoDB(formData)
            .then((res) => {
                setUserIDtoDB(res.data.user._id)
                localStorage.setItem("userID", res.data.user._id)
                localStorage.setItem("user", true)
                setSignin(true)

            })
            .catch((err) => { console.log(err.response.data.message); })
    }


    function registerUser(formData) {
        registertoDB(formData)
            .then((res) => { })
            .catch((err) => { console.log(err); })
    }




    // ========================== TODOS ================================
    function addNewTodos(name) {
        addTodotoDB({ name, important: false, complete: false, userID: userIDtoDB })
            .then((res) => console.log(res.data))
            .catch((err) => { console.log(err) })
    }
    function addNewImportantTodos(name){
        addTodotoDB({ name, important: true, complete: false, userID: userIDtoDB })
        .then((res) => console.log(res.data))
        .catch((err) => { console.log(err) })
    }


    function toggleTodo(id) {
        toggleTodotoDB(id)
            .then((res) => { console.log(res.data) })
            .catch((err) => { console.log(err) })
    }

    function importantTodos(id) {
        importantTodotoDB(id)
            .then((res) => { console.log(res.data) })
            .catch((err) => { console.log(err) })

    }
    function deleteTodos() {
        deleteTodotoDB(userIDtoDB)
            .then((res) => console.log(res))
            .catch((err) => { console.log(err) })
    }


    return <TodoContext.Provider value={{
        loginUser,
        addNewImportantTodos,
        registerUser,
        addNewTodos,
        toggleTodo,
        importantTodos,
        deleteTodos,
        setSignin,
        todos,
        signin,

    }}>
        {children}
    </TodoContext.Provider>
} 