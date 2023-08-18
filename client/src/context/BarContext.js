import { createContext, useContext, useState } from "react";

const BarContext = createContext();

export const BarProvider = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleBar = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <BarContext.Provider value={{ activeIndex, toggleBar }}>
      {children}
    </BarContext.Provider>
  );
};

export const useBarContext = () => {
  return useContext(BarContext);
};
