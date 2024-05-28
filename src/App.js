import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AppMain } from "./AppMain";
import { ThemeContextProvider } from "./context/ThemeContext";
import { SettingsContextProvider } from "./context/SettingsContext";
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
        <SettingsContextProvider>
          <FontFamilyContextProvider>
            <AppMain />
          </FontFamilyContextProvider>
        </SettingsContextProvider>
      </ThemeContextProvider>
    </ChakraProvider>
  );
};
