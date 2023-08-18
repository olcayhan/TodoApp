import React, { useState, useRef, useCallback, useEffect } from "react";
import Todo from "../Todo";
import StartScreen from "./StartScreen";
import useTodos from "../../hooks/useTodos";
import useUser from "../../hooks/useUser";
import Spinner from "../Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import config from "../../env/config";

export default function TodoList() {
  const todoNameRef = useRef();
  const { data: user, isLoading } = useUser();

  const {
    data: todos,
    isLoading: isLoading2,
    mutate: mutateTodos,
  } = useTodos(user?._id);
  const navigate = useNavigate();

  const [completeControl, setCompleteControl] = useState(true);

  useEffect(() => {
    if (!isLoading && user === undefined) navigate("/auth");
  }, [navigate, isLoading, user]);

  const addTodo = useCallback(
    async (name) => {
      try {
        const url = new URL("/todos/add", config.apiUrl);
        const data = {
          name,
          important: false,
          complete: false,
          userID: user?._id,
        };
        await axios.post(url, data);
        mutateTodos();
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [mutateTodos, user?._id]
  );

  const deleteTodo = useCallback(async () => {
    try {
      const url = new URL("/todos/delete", config.apiUrl);
      await axios.post(url, { id: user?._id });
      mutateTodos();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [mutateTodos, user?._id]);

  let lengthOfCompleteTodo = todos?.filter((todo) => todo.complete === true);

  /* that must be fix at backend */
  todos?.sort(function (x, y) {
    return x.important === y.important ? 0 : x.important ? -1 : 1;
  });

  if (isLoading || isLoading2) {
    return <Spinner />;
  }

  return (
    <div
      className={`
        ${todos?.length !== 0 && "overflow-hidden"}
        w-full
        h-full
        relative
       `}
    >
      {todos?.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <StartScreen />
        </div>
      )}
      <div className="flex flex-col justify-center items-center md:w-full gap-1 py-14">
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
          className="flex flex-col justify-center items-center md:w-full gap-1 py-8"
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
      </div>
    </div>
  );
}
