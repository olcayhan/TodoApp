import React, { useCallback, useState } from "react";
import axios from "axios";
import useTodos from "../hooks/useTodos";
import useUser from "../hooks/useUser";

export default function Todo({ todo, completeControl }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const { data: user } = useUser();
  const { mutate: mutatedTodos } = useTodos(user?._id);

  const toggleTodo = useCallback(
    async (id) => {
      try {
        await axios.post("/todos/toggle", { id: id });

        mutatedTodos();
      } catch (error) {
        console.log(error);
        console.error("Something went wrong");
      }
    },
    [mutatedTodos]
  );

  const importantTodo = useCallback(
    async (id) => {
      try {
        await axios.post("/todos/important", { id: id });

        mutatedTodos();
      } catch (error) {
        console.log(error);
        console.error("Something went wrong");
      }
    },
    [mutatedTodos]
  );

  return (
    <>
      <div
        className="
        flex
        flex-row
        justify-between
        items-center
        px-3
        w-full
        bg-neutral-50
        rounded-lg
        border-none
        opacity-90
        hover:opacity-80
      "
        onClick={handleShow}
      >
        <button
          type="checkbox"
          className="w-5 h-5 text-xs rounded-full border-[1px] border-neutral-700"
          onClick={() => {
            toggleTodo(todo._id);
          }}
          style={
            todo.complete && completeControl
              ? { backgroundColor: "#748DA6", color: "white", border: "none" }
              : {}
          }
        >
          <i
            className="fa fa-check"
            style={
              todo.complete && completeControl ? { visibility: "visible" } : {}
            }
            aria-hidden="true"
          ></i>
        </button>

        <span
          className="px-3 py-2"
          style={
            todo.complete
              ? { textDecoration: "line-through" }
              : { textDecoration: "default" }
          }
        >
          {todo.name}
        </span>

        <button
          className="border-none px-1"
          type="checkbox"
          onClick={() => {
            importantTodo(todo._id);
          }}
        >
          {!todo.important ? (
            <i className="fa-regular fa-star"></i>
          ) : (
            <i className="fa-solid fa-star" style={{ color: "#748DA6" }}></i>
          )}
        </button>
      </div>
    </>
  );
}
