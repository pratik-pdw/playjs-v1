import React from "react";
import Editor from "@monaco-editor/react";
import { THEME_TYPE, useTheme } from "./context/ThemeContext";
import { useSettingsContext } from "./context/SettingsContext";
import { useFontFamily } from "./context/FontFamilyContext";

export const CodeEditor = ({ value, handleEditorChange }) => {
  const { theme } = useTheme();
  const {
    settings: { fontSize, lineNumbers, minimap, wordWrap },
  } = useSettingsContext();
  const { fontFamily } = useFontFamily();

  return (
    <Editor
      theme={theme === THEME_TYPE.LIGHT ? "vs-code" : "vs-dark"}
      options={{
        fontFamily: `${fontFamily}, Menlo, Monaco, monospace`,
        fontSize,
        lineNumbers: lineNumbers ? "on" : "off",
        fontLigatures: true,
        wordWrap: wordWrap ? "on" : "off",
        minimap: {
          enabled: minimap,
        },
      }}
      value={value}
      onChange={handleEditorChange}
      height="100vh"
      defaultLanguage="javascript"
    />
  );
};
