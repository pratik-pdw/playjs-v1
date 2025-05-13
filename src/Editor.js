import React, { useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { THEME_TYPE, useTheme } from './context/ThemeContext';
import { useSettingsContext } from './context/SettingsContext';
import { useFontFamily } from './context/FontFamilyContext';
import * as monaco from 'monaco-editor';

export const CodeEditor = ({ value, language, handleEditorChange, onCmdEnter }) => {
  const { theme } = useTheme();
  const {
    settings: { fontSize, lineNumbers, minimap, wordWrap },
  } = useSettingsContext();
  const { fontFamily } = useFontFamily();
  const editorRef = React.useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        onCmdEnter(value);
      });
    }
  }, [value, onCmdEnter]);

  return (
    <Editor
      onMount={(editor) => (editorRef.current = editor)}
      theme={theme === THEME_TYPE.LIGHT ? 'vs-code' : 'vs-dark'}
      options={{
        fontFamily: `${fontFamily}, Menlo, Monaco, monospace`,
        fontSize,
        lineNumbers: lineNumbers ? 'on' : 'off',
        fontLigatures: true,
        wordWrap: wordWrap ? 'on' : 'off',
        minimap: {
          enabled: minimap,
        },
      }}
      value={value}
      onChange={handleEditorChange}
      height="100vh"
      defaultLanguage={language}
    />
  );
};
