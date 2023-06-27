import React, { useContext, useEffect, useState } from "react";
import { logintoDB, registertoDB } from "../axios";

const TodoContext = React.createContext();

export function useTodo() {
  return useContext(TodoContext);
}

export const TodoProvider = ({ children }) => {
  const [signin, setSignin] = useState(localStorage.getItem("user"));
  const [isRender, setRender] = useState(true);

  // setting user to take data
  useEffect(() => {
    setRender(false);
  }, [isRender]);

  // ======================= LOGIN =================================
  function loginUser(formData) {
    logintoDB(formData)
      .then((res) => {
        localStorage.setItem("userID", res.data.user._id);
        localStorage.setItem("user", true);
        setSignin(true);
        setRender(true);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }

  function registerUser(formData) {
    registertoDB(formData)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <TodoContext.Provider
      value={{
        loginUser,
        registerUser,
        setSignin,
        signin,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
