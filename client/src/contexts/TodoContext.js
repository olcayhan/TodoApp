import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { addTodotoDB, getTodotoDB, logintoDB, registertoDB, toggleTodotoDB, deleteTodotoDB } from '../axios'


const TodoContext = React.createContext();



export function useTodo() {
    return useContext(TodoContext)
}


export const TodoProvider = ({ children }) => {

    const [signin, setSignin] = useState(localStorage.getItem("user"));
    const [userIDtoDB, setUserIDtoDB] = useState(localStorage.getItem("userID"));
    const [todos, setTodos] = useState([])
    const [isRender, setIsRender] = useState(false)



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


    }, [signin])


    useEffect(() => {
        getTodotoDB(userIDtoDB)
            .then((res) => {
                setTodos([...res.data.other])
            })
            .catch((err) => { console.log(err.message) });

        setIsRender(false)
    }, [isRender])


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
        setIsRender(true)
    }


    function toggleTodo(id) {
        toggleTodotoDB(id)
            .then((res) => { console.log(res.data) })
            .catch((err) => { console.log(err) })
        setIsRender(true)
    }

    function importantTodos(id) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.important = !todo.important
        setTodos(newTodos)

    }
    function deleteTodos() {
        const newTodos = todos.filter(todo => todo.complete === false)
        setTodos(newTodos)
        deleteTodotoDB()
    }


    return <TodoContext.Provider value={{
        loginUser,
        registerUser,
        addNewTodos,
        toggleTodo,
        importantTodos,
        deleteTodos,
        todos,
        signin,
        setSignin

    }}>
        {children}
    </TodoContext.Provider>
} 