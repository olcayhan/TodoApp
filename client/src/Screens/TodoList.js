import React, { useState, useRef } from "react";
import Todo from "../components/Todo";
import StartScreen from "../components/StartScreen";
import { useTodo } from "../contexts/TodoContext";
import Sidebar from "../components/Sidebar";

export default function TodoList() {
  const todoNameRef = useRef();
  const { addNewTodos, deleteTodos, todos } = useTodo();

  let lengthOfCompleteTodo = todos.filter((todo) => todo.complete === true);

  // complete control for todo list
  const [completeControl, setCompleteControl] = useState(true);

  // sorting of todo list for important
  todos.sort(function (x, y) {
    return x.important === y.important ? 0 : x.important ? -1 : 1;
  });

  return (
    <div className="grid grid-cols-12 gap-4 h-full w-full">
      <Sidebar />
      <div
        className={`
        ${todos.length !== 0 && "overflow-auto"}
       col-span-12 
       xl:col-span-10
       w-full
       h-3/4
       px-3
       `}
      >
        {todos.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <StartScreen />
          </div>
        )}
          <div className="flex flex-col justify-center items-center xl:w-3/4 gap-1 py-14">
            {todos.length !== 0 &&
              todos.map((todo, key) => {
                return (
                  !todo.complete && (
                    <Todo
                      todo={todo}
                      key={key}
                      completeControl={completeControl}
                    />
                  )
                );
              })}
          </div>

          <div className="mt-2">
            {lengthOfCompleteTodo.length !== 0 && (
              <button
                className="flex flex-row items-center justify-center gap-3 px-2 bg-neutral-50 border-none rounded-md opacity-70 py-1 my-2 hover:opacity-90 transition"
                onClick={() => {
                  if (completeControl) setCompleteControl(false);
                  else setCompleteControl(true);
                }}
              >
                <i
                  className="fa fa-angle-down"
                  style={
                    completeControl
                      ? {
                          transform: "rotate(0deg)",
                          transition: "all 0.3s ease",
                        }
                      : {
                          transform: "rotate(-90deg)",
                          transition: "all 0.3s ease",
                        }
                  }
                ></i>
                Completed
                <span>{lengthOfCompleteTodo.length}</span>
              </button>
            )}

            <div
              className="flex flex-col justify-center items-center xl:w-3/4 gap-1 py-8"
              style={
                completeControl
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            >
              {lengthOfCompleteTodo.length !== 0 &&
                todos.map((item, key) => {
                  return (
                    item.complete && (
                      <Todo
                        todo={item}
                        key={key}
                        completeControl={completeControl}
                      />
                    )
                  );
                })}
            </div>
          </div>

          <div
            className="
              fixed
              bottom-7
              left-0
              xl:left-auto
              flex
              flex-row
              items-center
              justify-center
              xl:w-3/5
              w-full
              px-2
              py-2
              gap-3
              bg-slate-50
              rounded-xl
              "
          >
            <button
              className="
              w-5
              h-5
              border-[2px]
              border-slate-950
              rounded-full
              px-2
            "
              onClick={() => {
                if (todoNameRef.current.value !== "")
                  addNewTodos(todoNameRef.current.value);

                todoNameRef.current.value = "";
              }}
            ></button>

            <input
              className="
              border-none
              outline-none
              w-full
            "
              ref={todoNameRef}
              type="text"
              placeholder="Add a task"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (todoNameRef.current.value !== "")
                    addNewTodos(todoNameRef.current.value);
                  todoNameRef.current.value = "";
                }
              }}
            />

            <button
              className="
            text-[#b73e3e]
            text-xl
            border-none
            px-2
          "
              onClick={() => deleteTodos()}
            >
              <i className="fa-sharp fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
  );
}
