import React, { useContext, useEffect, useState } from "react";
import { addTodo, getTodo, login, register } from '../axios'


const TodoContext = React.createContext();



export function useTodo() {
    return useContext(TodoContext)
}


export const TodoProvider = ({ children }) => {

    const [signin, setSignin] = useState(false);
    const [todos, setTodos] = useState([])




    // useLayoutEffect(() => {
    //     getTodo()
    //         .then((res) => {
    //             setTodos([...res.data.other[0].todos])
    //             localStorage.setItem("todos", [...res.data.other[0].todos])
    //         })
    //         .catch((err) => { console.log(err.message) });
    // }, [])


    // useEffect(() => {

    //     addTodo({ todos: todos })
    //         .then((res) => { })

    // }, [todos])

    // ======================= LOGIN =================================
    function loginUser(formData) {
        login(formData)
            .then((res) => {
                setSignin(true)
            })
            .catch((err) => { console.log(err.response.data.message); })
    }


    function registerUser(formData) {
        register(formData)
            .then((res) => { })
            .catch((err) => { console.log(err); })
    }





    // ========================== TODOS ================================
    function addNewTodos(name) {

    }


    function toggleTodo(id) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)


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