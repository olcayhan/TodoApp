import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'


export default function Todo({ todo, completeControl }) {

    const { toggleTodo, importantTodos } = useTodo()
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);


    return (
        <>

            <div className='todo--todos' onClick={handleShow}>
                <button
                    type="checkbox"
                    className='todo--completebtn'
                    onClick={() => { toggleTodo(todo._id) }}
                    style={(todo.complete && completeControl) ? { backgroundColor: "#748DA6", color: "white", border: "none" } : {}}>

                    <i className="fa fa-check" style={(todo.complete && completeControl) ? { visibility: "visible" } : {}} aria-hidden="true"></i>

                </button>

                <span className='todo--text' style={(todo.complete) ? { textDecoration: "line-through" } : { textDecoration: "default" }} >{todo.name}</span>

                <button className='todo--important' type="checkbox" onClick={() => { importantTodos(todo._id) }}>
                    {
                        (!todo.important) ?
                            <i className="fa-regular fa-star"></i> :
                            <i className="fa-solid fa-star" style={{ color: "#748DA6" }} ></i>
                    }
                </button>

            </div >

        </>
    )
}

