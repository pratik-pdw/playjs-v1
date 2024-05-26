import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import { THEME_TYPE, useTheme } from "./context/ThemeContext";
import { useFontSize } from "./context/FontSizeContext";
import { useFontFamily } from "./context/FontFamilyContext";

export const CodeEditor = ({ value, handleEditorChange }) => {
  const { theme } = useTheme();
  const { fontSize } = useFontSize();
  const { fontFamily } = useFontFamily();

  return (
    <Editor
      theme={theme === THEME_TYPE.LIGHT ? "vs-code" : "vs-dark"}
      options={{
        fontFamily: `${fontFamily}, Menlo, Monaco, monospace`,
        fontSize,
      }}
      value={value}
      onChange={handleEditorChange}
      height="90vh"
      defaultLanguage="javascript"
    />
  );
};
