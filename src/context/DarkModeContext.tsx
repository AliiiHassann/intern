import React, { createContext, useState, useEffect, ReactNode } from "react";
import "../styles/DarkModeContext.css";

// Define Dark Mode Context Type
interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Create Context with Default Value
export const DarkModeContext = createContext<DarkModeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

// Define Props for Provider
interface DarkModeProviderProps {
  children: ReactNode;
}

// DarkModeProvider Component
export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("dark-mode");
    if (savedMode === "enabled") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("dark-mode", isDarkMode ? "disabled" : "enabled");
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
