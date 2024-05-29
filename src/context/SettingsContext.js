import React, { useContext, useState } from "react";

export const FONT_SIZE = {
  SMALL: "12px",
  MEDIUM: "14px",
  LARGE: "16px",
};

export const SettingsContext = React.createContext({
  fontSize: FONT_SIZE.MEDIUM,
  lineNumbers: true,
  miniMap: true,
  wordWrap: false,
});

export const SettingsContextProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    fontSize: FONT_SIZE.MEDIUM,
    lineNumbers: true,
    miniMap: true,
    wordWrap: false,
  });

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettingsContext() hook must be used within a SettingsContextProvider !"
    );
  }
  return context;
};
