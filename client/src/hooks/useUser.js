import useSWR from "swr";
import fetcher from "../libs/fetcher";

const useUser = () => {
  const userId = localStorage.getItem("userID");
  console.log(userId);
  const { data, error, isLoading, mutate } = useSWR(
    userId
      ? `https://todoapp-backend-rlvk.onrender.com/users/get/${userId}`
      : null,
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useUser;
