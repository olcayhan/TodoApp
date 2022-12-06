import React, { useState, useRef } from 'react'
import Todo from '../components/Todo'
import StartScreen from '../components/StartScreen'
import { useTodo } from '../contexts/TodoContext';

export default function TodoList() {

    const todoNameRef = useRef()
    const { addNewTodos, deleteTodos, todos } = useTodo()

    let lengthOfCompleteTodo = todos.filter(todo => todo.complete === true);

    // complete control for todo list
    const [completeControl, setCompleteControl] = useState(true)

    // sorting of todo list for important
    todos.sort(function (x, y) {
        return (x.important === y.important) ? 0 : x.important ? -1 : 1;

    });


    return (
        <div className='todos-main'>
            {
                todos.length !== 0 ? todos.map((todo, key) => {
                    return !todo.complete && <Todo todo={todo} key={key} completeControl={completeControl} />
                }) : <StartScreen />
            }



            <div className='mt-4'>
                {
                    lengthOfCompleteTodo.length !== 0 && <button className='todo--completedbtn'
                        onClick={() => {
                            if (completeControl) setCompleteControl(false)
                            else setCompleteControl(true)
                        }}>

                        <i className="fa fa-angle-down me-2" style={completeControl ? { transform: "rotate(0deg)", transition: "all 0.3s ease" } : { transform: "rotate(-90deg)", transition: "all 0.3s ease" }}></i>
                        Completed
                        <span className='ms-2 me-2'>{lengthOfCompleteTodo.length}</span>

                    </button>
                }

                <div style={(completeControl) ? { visibility: "visible" } : { visibility: "hidden" }}>
                    {
                        lengthOfCompleteTodo.length !== 0 && todos.map((item, key) => {
                            return item.complete && <Todo todo={item} key={key} completeControl={completeControl} />
                        })

                    }

                </div>
            </div>
            <div className='fixed-bottom d-flex flex-row' id='todo--footer'>


                <button className='todo-addbtn' onClick={() => {
                    if (todoNameRef.current.value !== "") addNewTodos(todoNameRef.current.value);


                    todoNameRef.current.value = "";
                }} ></button>


                <input className='todo--input' ref={todoNameRef} type="text" placeholder='Add a task' onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        if (todoNameRef.current.value !== "") addNewTodos(todoNameRef.current.value);
                        todoNameRef.current.value = "";
                    }
                }} />

                <button className="todo--deletebtn" onClick={() => deleteTodos()} >
                    <i className="fa-sharp fa-solid fa-trash"></i>
                </button>

            </div>
        </div >
    )
}
