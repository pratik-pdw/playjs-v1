import * as React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Home } from './Home';
import { ThemeContextProvider } from './context/ThemeContext';
import { SettingsContextProvider } from './context/SettingsContext';
import './App.css';
import { FontFamilyContextProvider } from './context/FontFamilyContext';
// Supports weights 200-800
import '@fontsource-variable/plus-jakarta-sans';

const theme = extendTheme({
  fonts: {
    body: `'Bricolage Grotesque', sans-serif`,
  },
  zIndices: {
    docked: 10000,
  },
});

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <ThemeContextProvider>
        <SettingsContextProvider>
          <FontFamilyContextProvider>
            <Home />
          </FontFamilyContextProvider>
        </SettingsContextProvider>
      </ThemeContextProvider>
    </ChakraProvider>
  );
};
