import React, { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [menu, setMenu] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
  
    function handleWindowSizeChange() {
      setWidth(prev => window.innerWidth);
    }
    
    useEffect(() => {
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
      };
    }, []);

    return (
    <Context.Provider
      value={{
        menu,
        setMenu,
        width,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);