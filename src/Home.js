import { Box, Button, Container, Flex, IconButton, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { CodeEditor } from './Editor';
import { useCallback, useEffect, useState } from 'react';
import { FaBolt, FaSun, FaTerminal, FaLaptop, FaMoon } from 'react-icons/fa6';
import { Logger } from './Logger';
import { useLogger } from './useLogger';
import { THEME_TYPE, useTheme } from './context/ThemeContext';
import { useSettingsContext } from './context/SettingsContext';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Settings } from './Settings';
import { IoLogoCss3, IoLogoHtml5 } from 'react-icons/io';
import { IoGolf } from 'react-icons/io5';
import { DEFAULT_CSS_CODE, DEFAULT_HTML_CODE, DEFAULT_JS_CODE } from './constants';
import { getIframeSrcCode } from './utils/get-iframe-src-code';
import { Preview } from './Preview';
import { SiJavascript } from 'react-icons/si';
import { FaExternalLinkAlt } from 'react-icons/fa';

export const Home = () => {
  const [htmlCode, setHtmlCode] = useState(DEFAULT_HTML_CODE);
  const [cssCode, setCssCode] = useState(DEFAULT_CSS_CODE);
  const [jsCode, setJsCode] = useState(DEFAULT_JS_CODE);

  const { logs, setLogs } = useLogger();
  const { theme, setTheme } = useTheme();
  const {
    settings: { fontSize },
  } = useSettingsContext();
  const [iframeSrc, setIFrameSrc] = useState('');

  const handleHtmlCodeChange = (code) => {
    setHtmlCode(code);
  };

  const handleCssCodeChange = (code) => {
    setCssCode(code);
  };

  const handleJavascriptCodeChange = (code) => {
    setJsCode(code);
  };

  const handleRun = useCallback(() => {
    setLogs([]);
    setIFrameSrc(getIframeSrcCode(htmlCode, cssCode, jsCode));
  }, [htmlCode, cssCode, jsCode, setLogs]);

  const handleThemeChange = () => {
    if (theme === THEME_TYPE.LIGHT) {
      setTheme(THEME_TYPE.DARK);
    } else {
      setTheme(THEME_TYPE.LIGHT);
    }
  };

  const handleCmdEnter = useCallback(() => {
    handleRun();
  }, [handleRun]);

  useEffect(() => {
    handleRun();
  }, [htmlCode, cssCode, jsCode, handleRun]);

  const isDark = theme === THEME_TYPE.DARK;

  return (
    <>
      <Box id="header" bg="#041C32" w="100%" p={3} color="white">
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Flex alignItems={'center'} gap={2}>
            <IoGolf size={25} />
            <Text as="b" fontSize="md">
              PlayJS
            </Text>
          </Flex>
          <Flex alignItems={'center'} gap={3}>
            <Button leftIcon={<FaBolt />} size="sm" onClick={handleRun}>
              Run
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
        <Panel defaultSize={50} minSize={20} maxSize={95}>
          <Tabs height={'100vh'} position="relative" variant="unstyled">
            <TabList backgroundColor={'#054663'} color={'white'}>
              <Tab>
                <IoLogoHtml5 />
                <Text ml={2} fontSize="sm">
                  HTML
                </Text>
              </Tab>
              <Tab>
                <IoLogoCss3 />
                <Text ml={2} fontSize="sm">
                  CSS
                </Text>
              </Tab>
              <Tab>
                <SiJavascript />
                <Text ml={2} fontSize="sm">
                  Javascript
                </Text>
              </Tab>
            </TabList>
            <TabIndicator mt="-1.5px" height="2px" bg="#70d3ff" borderRadius="1px" />
            <TabPanels>
              <TabPanel padding={0}>
                <CodeEditor language={'html'} onCmdEnter={handleCmdEnter} value={htmlCode} handleEditorChange={handleHtmlCodeChange} />
              </TabPanel>
              <TabPanel padding={0}>
                <CodeEditor language={'css'} onCmdEnter={handleCmdEnter} value={cssCode} handleEditorChange={handleCssCodeChange} />
              </TabPanel>
              <TabPanel padding={0}>
                <CodeEditor language={'typescript'} onCmdEnter={handleCmdEnter} value={jsCode} handleEditorChange={handleJavascriptCodeChange} />
              </TabPanel>
            </TabPanels>
          </Tabs>
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
        <Panel defaultSize={50} minSize={20}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={60} minSize={5}>
              <Container height={'100%'} minWidth={'100%'} margin={0} padding={0}>
                <Box bg="#064663" w="100%" p={2} color="white" display={'flex'} alignItems={'center'} gap={2}>
                  <FaLaptop />
                  <Text fontSize="sm">Preview</Text>
                  {false && (
                    <IconButton
                      size="sm"
                      onClick={() => null}
                      colorScheme="blue"
                      aria-label="Open Preview in New Window"
                      icon={<FaExternalLinkAlt />}
                    />
                  )}
                </Box>
                <Preview iFrameSrc={iframeSrc} />
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

            <Panel defaultSize={40} minSize={15} maxSize={95}>
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
