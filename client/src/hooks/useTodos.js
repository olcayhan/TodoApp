import useSWR from "swr";
import fetcher from "../libs/fetcher";

const useTodos = (userId) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId
      ? `https://todo-app-o8uu.onrender.com/todos/get/${userId}`
      : null,
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useTodos;
