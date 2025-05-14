import React, { useContext, useState } from 'react';

export const FONT_FAMILY = {
  PT_MONO: 'PT Mono',
  MONACO: 'Monaco',
  SOURCE_CODE_PRO: 'Source Code Pro',
  IBM_PLEX_MONO: 'IBM Plex Mono',
  OPERATOR_MONO: 'Operator Mono',
  CASCADIA_MONO: 'Cascadia Mono',
  ROBOTO_MONO: 'Roboto Mono',
};

export const FontFamilyContext = React.createContext(FONT_FAMILY.ROBOTO_MONO);

export const FontFamilyContextProvider = ({ children }) => {
  const [fontFamily, setFontFamily] = useState(FONT_FAMILY.ROBOTO_MONO);

  return <FontFamilyContext.Provider value={{ fontFamily, setFontFamily }}>{children}</FontFamilyContext.Provider>;
};

export const useFontFamily = () => {
  const context = useContext(FontFamilyContext);
  if (!context) {
    throw new Error('useFontFamily() hook must be used within a FontFamilyContextProvider !');
  }
  return context;
};
