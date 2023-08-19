import React, { useRef, useState } from "react";
import Todo from "./Todo";

export default function TodosFeed({ todos, emptyScreen, addTodo, deleteTodo }) {
  const [completeControl, setCompleteControl] = useState(true);
  const todoNameRef = useRef();

  let lengthOfCompleteTodo = todos?.filter((todo) => todo.complete === true);

  return (
    <div
      className={`
      ${todos?.length !== 0 && "overflow-hidden"}
      w-full
      h-full
      relative
      py-14
     `}
    >
      {todos?.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          {emptyScreen}
        </div>
      )}
      <div className="flex flex-col justify-start items-center md:w-full gap-1 h-[40vh] overflow-y-auto">
        {todos?.length !== 0 &&
          todos?.map((todo, key) => {
            return (
              !todo.complete && (
                <Todo todo={todo} key={key} completeControl={completeControl} />
              )
            );
          })}
      </div>

      <div className="mt-2">
        {lengthOfCompleteTodo?.length !== 0 && (
          <button
            className="flex flex-row items-center justify-center gap-3 px-2 bg-neutral-50 border-none rounded-md opacity-70 py-1 my-2 hover:opacity-90 transition"
            onClick={() => setCompleteControl(!completeControl)}
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
            <span>{lengthOfCompleteTodo?.length}</span>
          </button>
        )}

        <div
          className="flex flex-col justify-start items-center md:w-full gap-1 h-[35vh] overflow-y-auto"
          style={
            completeControl
              ? { visibility: "visible" }
              : { visibility: "hidden" }
          }
        >
          {lengthOfCompleteTodo?.length !== 0 &&
            todos?.map((item, key) => {
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
            absolute
            bottom-7
            left-0
            flex
            flex-row
            items-center
            justify-center
            w-full
            p-2
            gap-3
            bg-slate-50
            rounded-xl
            "
      >
        {addTodo && (
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
              if (todoNameRef?.current.value !== "")
                addTodo(todoNameRef?.current.value);

              todoNameRef.current.value = "";
            }}
          ></button>
        )}

        <input
          className="
            border-none
            outline-none
            w-full
          "
          ref={todoNameRef}
          type="text"
          placeholder="Add a task"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              if (todoNameRef.current.value !== "")
                addTodo(todoNameRef.current.value);
              todoNameRef.current.value = "";
            }
          }}
        />

        {deleteTodo && (
          <button
            className="
          text-[#b73e3e]
            text-xl
            border-none
            px-2
            "
            onClick={() => deleteTodo()}
          >
            <i className="fa-sharp fa-solid fa-trash"></i>
          </button>
        )}
      </div>
    </div>
  );
}
