import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AppMain } from "./AppMain";
import { ThemeContextProvider } from "./context/ThemeContext";
import { FontSizeContextProvider } from "./context/FontSizeContext";
import "./App.css";
import { FontFamilyContextProvider } from "./context/FontFamilyContext";

export const App = () => {
  return (
    <ChakraProvider>
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
