import React, { useCallback } from "react";
import StartImport from "./StartImport";
import useTodos from "../../hooks/useTodos";
import useUser from "../../hooks/useUser";
import axios from "axios";
import { toast } from "react-hot-toast";
import config from "../../env/config";
import TodosFeed from "../TodosFeed";

export default function Important() {
  const { data: user } = useUser();
  const { data: todos, mutate: mutateTodos } = useTodos(user?._id);

  const addTodo = useCallback(
    async (name) => {
      try {
        const url = new URL("/todos/add", config.apiUrl);
        const data = {
          name,
          important: true,
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

  let importants = todos?.filter((todos) => todos.important === true);
  return (
    <TodosFeed
      todos={importants}
      emptyScreen={<StartImport />}
      addTodo={addTodo}
    />
  );
}
