import React, { createContext, useEffect, useState } from "react";

interface IContext {
  isHideen: boolean;
  setIsHideen: (newState: boolean) => void;
}

const INITIAL_VALUES: IContext = {
  isHideen: false,
  setIsHideen: () => {},
};

export const NavComportamentContext = createContext(INITIAL_VALUES);

const NavComportamentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isHideen, setIsHideen] = useState(INITIAL_VALUES.isHideen);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function getHideen() {
      if (localStorage.getItem("navHideen")) {
        setIsHideen(
          JSON.parse(
            localStorage.getItem("navHideen") || `${INITIAL_VALUES.isHideen}`
          )
        );
      }
      setIsLoading(false);
    }
    getHideen();
  }, []);

  useEffect(() => {
    function setHideen() {
      if (isLoading === false) {
        localStorage.setItem("navHideen", JSON.stringify(isHideen));
      }
    }
    setHideen();
  }, [isHideen]);

  return (
    <NavComportamentContext.Provider value={{ isHideen, setIsHideen }}>
      {children}
    </NavComportamentContext.Provider>
  );
};

export default NavComportamentProvider;
