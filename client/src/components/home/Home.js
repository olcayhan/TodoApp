import React, { useCallback } from "react";
import StartScreen from "./StartScreen";
import useTodos from "../../hooks/useTodos";
import useUser from "../../hooks/useUser";
import axios from "axios";
import { toast } from "react-hot-toast";
import config from "../../env/config";
import TodosFeed from "../TodosFeed";

export default function TodoList() {
  const { data: user } = useUser();
  const { data: todos, mutate: mutateTodos } = useTodos(user?._id);

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

  /* that must be fix at backend */
  todos?.sort(function (x, y) {
    return x.important === y.important ? 0 : x.important ? -1 : 1;
  });

  return (
    <TodosFeed
      todos={todos}
      emptyScreen={<StartScreen />}
      addTodo={addTodo}
      deleteTodo={deleteTodo}
    />
  );
}
