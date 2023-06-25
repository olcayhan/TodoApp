import React, { useRef } from "react";
import StartImport from "../components/StartImport";
import Todo from "../components/Todo";
import { useTodo } from "../contexts/TodoContext";

export default function Important() {
  const { todos, addNewImportantTodos } = useTodo();
  const todoNameRef = useRef();

  let importants = todos.filter((todos) => todos.important === true);

  return (
    <div className="important-main">
      {importants.length !== 0 ? (
        todos.map((todo) => {
          return !todo.complete && todo.important && <Todo todo={todo} />;
        })
      ) : (
        <StartImport />
      )}

      <div className="fixed-bottom d-flex flex-row" id="todo--footer">
        <button
          className="todo-addbtn"
          onClick={() => {
            if (todoNameRef.current.value !== "")
              addNewImportantTodos(todoNameRef.current.value);

            todoNameRef.current.value = "";
          }}
        ></button>

        <input
          className="todo--input"
          ref={todoNameRef}
          type="text"
          placeholder="Add a task"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              if (todoNameRef.current.value !== "")
                addNewImportantTodos(todoNameRef.current.value);
              todoNameRef.current.value = "";
            }
          }}
        />
      </div>
    </div>
  );
}
