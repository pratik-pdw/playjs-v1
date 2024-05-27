import * as React from "react";
import { ChakraProvider, color, extendTheme } from "@chakra-ui/react";
import { AppMain } from "./AppMain";
import { ThemeContextProvider } from "./context/ThemeContext";
import { FontSizeContextProvider } from "./context/FontSizeContext";
import "./App.css";
import { FontFamilyContextProvider } from "./context/FontFamilyContext";
// Supports weights 200-800
import "@fontsource-variable/plus-jakarta-sans";

const theme = extendTheme({
  fonts: {
    body: `'Plus Jakarta Sans Variable', sans-serif`,
  },
});

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <ThemeContextProvider>
        <FontSizeContextProvider>
          <FontFamilyContextProvider>
            <AppMain />
          </FontFamilyContextProvider>
        </FontSizeContextProvider>
      </ThemeContextProvider>
    </ChakraProvider>
  );
};
