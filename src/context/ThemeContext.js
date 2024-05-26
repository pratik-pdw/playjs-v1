import React, { useContext, useState } from "react";

export const ThemeContext = React.createContext("light");

export const THEME_TYPE = {
  LIGHT: "light",
  DARK: "dark",
};

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(THEME_TYPE.DARK);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useTheme() hook must be used within a ThemeContextProvider!"
    );
  }
  return context;
};
