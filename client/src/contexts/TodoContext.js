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
    const [isRender, setRender] = useState(true)


    // setting user to take data
    useEffect(() => {
        if (!signin) setUserIDtoDB()
        getTodos()
        setRender(false)
    }, [isRender])


    // ======================= LOGIN =================================
    function loginUser(formData) {
        logintoDB(formData)
            .then((res) => {
                setUserIDtoDB(res.data.user._id)
                localStorage.setItem("userID", res.data.user._id)
                localStorage.setItem("user", true)
                setSignin(true)
                setRender(true)
            })
            .catch((err) => { console.log(err.response.data.message); })
    }


    function registerUser(formData) {
        registertoDB(formData)
            .then((res) => { })
            .catch((err) => { console.log(err); })
    }




    // ========================== TODOS ================================

    function getTodos() {
        getTodotoDB(userIDtoDB)
            .then((res) => {
                setTodos([...res.data.other])
            })
            .catch((err) => { console.log(err.message) });
    }
    function addNewTodos(name) {
        addTodotoDB({ name, important: false, complete: false, userID: userIDtoDB })
            .then((res) => setRender(true))
            .catch((err) => { console.log(err) })
    }
    function addNewImportantTodos(name) {
        addTodotoDB({ name, important: true, complete: false, userID: userIDtoDB })
            .then((res) => setRender(true))
            .catch((err) => { console.log(err) })

    }


    function toggleTodo(id) {
        toggleTodotoDB(id)
            .then((res) => { setRender(true) })
            .catch((err) => { console.log(err) })

    }

    function importantTodos(id) {
        importantTodotoDB(id)
            .then((res) => { setRender(true) })
            .catch((err) => { console.log(err) })
    }
    function deleteTodos() {
        deleteTodotoDB(userIDtoDB)
            .then((res) => setRender(true))
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