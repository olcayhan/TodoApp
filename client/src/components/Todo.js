import React, { useCallback, useState } from "react";
import axios from "axios";
import useTodos from "../hooks/useTodos";
import useUser from "../hooks/useUser";
import { toast } from "react-hot-toast";
import Rightbar from "./bars/Rightbar";
import { useBarContext } from "../context/BarContext";
import config from "../env/config";

export default function Todo({ todo, completeControl }) {
  const { toggleBar } = useBarContext();

  const { data: user } = useUser();
  const { mutate: mutatedTodos } = useTodos(user?._id);

  const toggleTodo = useCallback(
    async (id) => {
      try {
        const url = new URL("/todos/toggle", config.apiUrl);
        await axios.post(url, { id: id });
        mutatedTodos();
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [mutatedTodos]
  );

  const importantTodo = useCallback(
    async (id) => {
      try {
        const url = new URL("/todos/important", config.apiUrl);
        await axios.post(url, { id: id });
        mutatedTodos();
      } catch (error) {
        toast.error("Something went wrong");
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
        onClick={() => toggleBar(todo._id)}
      >
        <button
          type="checkbox"
          className={`w-5 h-5 text-xs rounded-full border-[1px] border-neutral-700 flex-shrink-0 ${
            todo.complete && completeControl
              ? "bg-blue-600 text-white border-none"
              : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleTodo(todo._id);
          }}
        >
          <i
            className={`fa fa-check ${
              todo.complete && completeControl ? "visible" : ""
            }`}
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
          onClick={(e) => {
            e.stopPropagation();
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

      <Rightbar todo={todo} index={todo._id} />
    </>
  );
}
