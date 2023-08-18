import useSWR from "swr";
import fetcher from "../libs/fetcher";
import config from "../env/config";
const useTodos = (userId) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? config.apiUrl + `/todos/get/` + userId : null,
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useTodos;
