import useSWR from "swr";
import fetcher from "../libs/fetcher";
import config from "../env/config";

const useUser = () => {
  const userID = localStorage.getItem("userID");
  const { data, error, isLoading, mutate } = useSWR(
    userID ? config.apiUrl + `/users/get/` + userID : null,
    fetcher
  );
  return { data, error, isLoading, mutate };
};

export default useUser;
