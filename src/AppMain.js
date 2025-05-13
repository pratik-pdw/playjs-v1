import { Box, Button, Container, Flex, IconButton, Text } from '@chakra-ui/react';
import { CodeEditor } from './Editor';
import { useCallback, useEffect, useState } from 'react';
import { FaBolt, FaCode, FaSquareJs, FaSun, FaTerminal, FaLaptop } from 'react-icons/fa6';
import { FaMoon } from 'react-icons/fa6';
import { Logger } from './Logger';
import { useLogger } from './useLogger';
import { THEME_TYPE, useTheme } from './context/ThemeContext';
import { useSettingsContext } from './context/SettingsContext';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import * as Babel from '@babel/standalone';
import { Settings } from './Settings';
import { MdKeyboardCommandKey } from 'react-icons/md';

const DEFAULT_CODE_VALUE = `/* Write your code from here...*/\nconsole.log('Hello, World ;)')`;

export const AppMain = () => {
  const [value, setValue] = useState(DEFAULT_CODE_VALUE);
  const { logs, setLogs } = useLogger();
  const { theme, setTheme } = useTheme();
  const {
    settings: { fontSize },
  } = useSettingsContext();
  const [iframeSrc, setIFrameSrc] = useState('');

  function handleEditorChange(value) {
    setValue(value);
  }

  const handleRun = useCallback(
    (editorCode) => {
      setLogs([]);
      try {
        const { code } = Babel.transform(editorCode, {
          presets: [
            [
              'env',
              {
                targets: {
                  esmodules: true, // ⚠️ Important: avoids CommonJS
                },
                modules: false, // 👈 prevents transforming ESModules to CommonJS
              },
            ],
            'react',
          ],
        });
        const html = `
        <!DOCTYPE html>
        <html lang="en"> 
        <head></head>
        <body>
         <script type="module">
        ['log', 'error', 'warn', 'info'].forEach((type) => {
        const original = console[type];
        console[type] = function (...args) {
          window.parent.postMessage({
            source: 'iframe-console',
            payload: { method: type, data: args },
          }, '*');
          original.apply(console, args);
          };
        });

                // Catch uncaught runtime errors
          window.addEventListener('error', (event) => {
            window.parent.postMessage({
              source: 'iframe-console',
              payload: {
                method: 'error',
                data: [event.message],
              },
            }, '*');
          });

          // Catch unhandled Promise rejections
          window.addEventListener('unhandledrejection', (event) => {
            window.parent.postMessage({
              source: 'iframe-console',
              payload: {
                method: 'error',
                data: [event.reason],
              },
            }, '*');
          });
        </script>
        <script type="module">
          ${code}
        </script>
        </body>
       
      `;
        const blob = new Blob([html], { type: 'text/html' });
        setIFrameSrc(URL.createObjectURL(blob));
      } catch (error) {
        console.error(error.message);
      }
    },
    [setLogs],
  );

  useEffect(() => {
    if (!value) setLogs([]);
  }, [value, setLogs]);

  const handleThemeChange = () => {
    if (theme === THEME_TYPE.LIGHT) {
      setTheme(THEME_TYPE.DARK);
    } else {
      setTheme(THEME_TYPE.LIGHT);
    }
  };

  const handleCmdEnter = useCallback(
    (editorCode) => {
      handleRun(editorCode);
    },
    [handleRun],
  );

  const isDark = theme === THEME_TYPE.DARK;

  return (
    <>
      <Box id="header" bg="#041C32" w="100%" p={3} color="white">
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Flex alignItems={'center'} gap={2}>
            <FaSquareJs size={30} />
            <Text as="b" fontSize="md">
              PlayJS
            </Text>
          </Flex>
          <Flex alignItems={'center'} gap={5}>
            <Button leftIcon={<FaBolt />} size="sm" onClick={() => handleRun(value)}>
              Run (<MdKeyboardCommandKey />
              /Ctrl + Return)
            </Button>
            <Settings />
            <IconButton
              size="sm"
              onClick={handleThemeChange}
              colorScheme="blue"
              aria-label="Search database"
              icon={theme === THEME_TYPE.LIGHT ? <FaMoon /> : <FaSun />}
            />
          </Flex>
        </Flex>
      </Box>
      <PanelGroup direction="horizontal">
        <Panel defaultSize={50} minSize={30}>
          <Container minWidth={'100%'} margin={0} padding={0}>
            <Box bg="#064663" w="100%" p={2} color="white" display={'flex'} alignItems={'center'} gap={2}>
              <FaCode />
              <Text fontSize="sm">Editor</Text>
            </Box>
            <CodeEditor onCmdEnter={handleCmdEnter} value={value} handleEditorChange={handleEditorChange} />
          </Container>
        </Panel>
        <PanelResizeHandle
          style={{
            width: '10px',
            backgroundColor: '#064663',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: '1px', height: '20px', backgroundColor: 'white' }}></div>
          <div
            style={{
              width: '1px',
              height: '20px',
              backgroundColor: 'white',
              marginLeft: 3,
            }}
          ></div>
        </PanelResizeHandle>
        <Panel defaultSize={50} minSize={30}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={60} minSize={5}>
              <Container height={'100%'} minWidth={'100%'} margin={0} padding={0}>
                <Box bg="#064663" w="100%" p={2} color="white" display={'flex'} alignItems={'center'} gap={2}>
                  <FaLaptop />
                  <Text fontSize="sm">Preview</Text>
                </Box>
                <iframe
                  style={{ width: '100%', height: '100%' }}
                  title="iframe-playjs-runner"
                  sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
                  allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi; payment;"
                  allowtransparency="true"
                  allowFullScreen={true}
                  src={iframeSrc}
                />
              </Container>
            </Panel>
            <PanelResizeHandle
              style={{
                backgroundColor: '#064663',
                height: '10px',
                flexDirection: 'column',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
              }}
            >
              <div style={{ backgroundColor: 'white', height: '1px', width: '20px' }} />
              <div style={{ backgroundColor: 'white', height: '1px', width: '20px' }} />
            </PanelResizeHandle>

            <Panel defaultSize={40} minSize={30} maxSize={95}>
              <Container minWidth={'100%'} margin={0} padding={0}>
                <Box bg="#064663" w="100%" p={2} color="white" display={'flex'} alignItems={'center'} gap={2}>
                  <FaTerminal />
                  <Text fontSize="sm">Console</Text>
                </Box>
                <div
                  style={{
                    height: '100vh',
                    overflowY: 'auto',
                    color: isDark ? '#fff' : '#242424',
                    backgroundColor: isDark ? '#242424' : '#fff',
                  }}
                >
                  <Logger logs={logs} theme={theme} fontSize={fontSize} />
                </div>
              </Container>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </>
  );
};
