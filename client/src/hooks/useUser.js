import useSWR from "swr";
import fetcher from "../libs/fetcher";

const useUser = () => {
  const userID = localStorage.getItem("userID");
  const { data, error, isLoading, mutate } = useSWR(
    userID
      ? `https://todo-app-o8uu.onrender.com/users/get/${userID}`
      : null,
    fetcher
  );
  return { data, error, isLoading, mutate };
};

export default useUser;
