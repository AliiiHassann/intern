import React, { createContext, useState, useEffect } from "react";
import "../styles/DarkModeContext.css";

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("dark-mode");
    if (savedMode === "enabled") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      setIsDarkMode(false);
      document.body.classList.remove("dark-mode");
      localStorage.setItem("dark-mode", "disabled");
    } else {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
      localStorage.setItem("dark-mode", "enabled");
    }
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
