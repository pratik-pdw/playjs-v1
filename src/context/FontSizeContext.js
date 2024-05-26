import React, { useContext, useState } from "react";

export const FONT_SIZE = {
  SMALL: "12px",
  MEDIUM: "14px",
  LARGE: "16px",
};

export const FontSizeContext = React.createContext(FONT_SIZE.MEDIUM);

export const FontSizeContextProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(FONT_SIZE.MEDIUM);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error(
      "useFontSize() hook must be used within a FontSizeContextProvider !"
    );
  }
  return context;
};
