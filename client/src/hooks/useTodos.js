import useSWR from "swr";
import fetcher from "../libs/fetcher";

const useUser = (userId) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId
      ? `https://todoapp-backend-rlvk.onrender.com/todos/get/${userId}`
      : null,
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useUser;
