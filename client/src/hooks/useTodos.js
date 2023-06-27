import useSWR from "swr";
import fetcher from "../libs/fetcher";

const useTodos = (userId) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId
      ? `/todos/get/${userId}`
      : null,
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useTodos;
