import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  Divider,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { CodeEditor } from "./Editor";
import { useEffect, useRef, useState } from "react";
import {
  FaBolt,
  FaCheck,
  FaCode,
  FaFont,
  FaSquareJs,
  FaSun,
  FaTerminal,
} from "react-icons/fa6";
import { FaMoon } from "react-icons/fa6";

import { Logger } from "./Logger";
import { useLogger } from "./useLogger";
import { THEME_TYPE, useTheme } from "./context/ThemeContext";
import { FONT_SIZE, useSettingsContext } from "./context/SettingsContext";
import { IoSettingsSharp } from "react-icons/io5";
import { PiListNumbersBold } from "react-icons/pi";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { VscWordWrap } from "react-icons/vsc";
import { GoProjectRoadmap } from "react-icons/go";

const DEFAULT_CODE_VALUE = `/* Write your code from here...*/\nconsole.log('Hello, World ;)')`;

export const AppMain = () => {
  const [value, setValue] = useState(DEFAULT_CODE_VALUE);
  const { logs, setLogs } = useLogger();
  const { theme, setTheme } = useTheme();
  const {
    settings: { fontSize, lineNumbers, wordWrap, minimap },
    setSettings,
  } = useSettingsContext();

  const popoverContentRef = useRef();

  function handleEditorChange(value) {
    setValue(value);
  }

  function handleRun() {
    setLogs([]);
    try {
      // eslint-disable-next-line no-new-func
      new Function(value)();
    } catch (error) {
      console.error(error.message);
    }
  }

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

  const handleFontSizeClick = (fs) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      fontSize: FONT_SIZE[fs],
    }));
  };

  const isDark = theme === THEME_TYPE.DARK;

  return (
    <>
      <Box bg="#041C32" w="100%" p={3} color="white">
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex alignItems={"center"} gap={2}>
            <FaSquareJs size={30} />
            <Text as="b" fontSize="md">
              PlayJS
            </Text>
          </Flex>
          <Flex alignItems={"center"} gap={5}>
            <Button leftIcon={<FaBolt />} size="sm" onClick={handleRun}>
              Run
            </Button>
            <Popover
              id="popover-container"
              initialFocusRef={popoverContentRef}
              closeOnBlur
              autoFocus
              trigger="click"
            >
              <PopoverTrigger>
                <IconButton
                  size="sm"
                  aria-label="Settings"
                  icon={<IoSettingsSharp />}
                >
                  Trigger
                </IconButton>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton ref={popoverContentRef} />
                <PopoverHeader color={"black"}>Settings</PopoverHeader>
                <PopoverBody>
                  <Text marginLeft={2} fontSize={"sm"} as="b" color={"black"}>
                    Editor & Console
                  </Text>
                  <ButtonGroup
                    marginTop={2}
                    display={"flex"}
                    aria-label="Font Size"
                    isAttached
                    spacing="6"
                  >
                    <Button
                      justifyContent={"start"}
                      flexGrow={"1"}
                      leftIcon={<FaFont />}
                      size="sm"
                      disabled
                    >
                      Font Size
                    </Button>
                    {Object.keys(FONT_SIZE).map((fs) => (
                      <Button
                        onClick={() => handleFontSizeClick(fs)}
                        key={fs}
                        size="sm"
                      >
                        <Text as={FONT_SIZE[fs] === fontSize ? "u" : ""}>
                          {FONT_SIZE[fs]}
                        </Text>
                      </Button>
                    ))}
                  </ButtonGroup>
                  <Divider marginTop={3} marginBottom={1} />
                  <Text paddingLeft={2} fontSize={"sm"} as="b" color={"black"}>
                    Editor
                  </Text>
                  <Box marginTop={2} color={"black"}>
                    <ButtonGroup display={"flex"} isAttached>
                      <Button
                        justifyContent={"start"}
                        flexGrow={"1"}
                        leftIcon={<PiListNumbersBold />}
                        size="sm"
                        disabled
                      >
                        Line Numbers
                      </Button>
                      <Button size="sm">
                        <Checkbox
                          value={lineNumbers}
                          onChange={(e) =>
                            setSettings((prevSettings) => ({
                              ...prevSettings,
                              lineNumbers: e.target.checked,
                            }))
                          }
                          defaultChecked
                        ></Checkbox>
                      </Button>
                    </ButtonGroup>
                  </Box>

                  <Box marginTop={2} color={"black"}>
                    <ButtonGroup display={"flex"} isAttached>
                      <Button
                        justifyContent={"start"}
                        flexGrow={"1"}
                        leftIcon={<VscWordWrap />}
                        size="sm"
                        disabled
                      >
                        Word Wrap
                      </Button>
                      <Button size="sm">
                        <Checkbox
                          value={wordWrap}
                          onChange={(e) =>
                            setSettings((prevSettings) => ({
                              ...prevSettings,
                              wordWrap: e.target.checked,
                            }))
                          }
                          defaultChecked
                        ></Checkbox>
                      </Button>
                    </ButtonGroup>
                  </Box>

                  <Box marginTop={2} color={"black"}>
                    <ButtonGroup display={"flex"} isAttached>
                      <Button
                        justifyContent={"start"}
                        flexGrow={"1"}
                        leftIcon={<GoProjectRoadmap />}
                        size="sm"
                        disabled
                      >
                        Minimap
                      </Button>
                      <Button size="sm">
                        <Checkbox
                          value={minimap}
                          onChange={(e) =>
                            setSettings((prevSettings) => ({
                              ...prevSettings,
                              minimap: e.target.checked,
                            }))
                          }
                          defaultChecked
                        ></Checkbox>
                      </Button>
                    </ButtonGroup>
                  </Box>
                </PopoverBody>
              </PopoverContent>
            </Popover>

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
        <Panel defaultSize={30} minSize={30}>
          <Container minWidth={"100%"} margin={0} padding={0}>
            <Box
              bg="#064663"
              w="100%"
              p={2}
              color="white"
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              <FaCode />
              <Text fontSize="sm">Editor</Text>
            </Box>
            <CodeEditor value={value} handleEditorChange={handleEditorChange} />
          </Container>
        </Panel>
        <PanelResizeHandle
          style={{
            width: "10px",
            backgroundColor: "#064663",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{ width: "1px", height: "20px", backgroundColor: "white" }}
          ></div>
          <div
            style={{
              width: "1px",
              height: "20px",
              backgroundColor: "white",
              marginLeft: 3,
            }}
          ></div>
        </PanelResizeHandle>
        <Panel defaultSize={30} minSize={30}>
          <Container minWidth={"100%"} margin={0} padding={0}>
            <Box
              bg="#064663"
              w="100%"
              p={2}
              color="white"
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              <FaTerminal />
              <Text fontSize="sm">Console</Text>
            </Box>
            <div
              style={{
                height: "100vh",
                overflowY: "auto",
                color: isDark ? "#fff" : "#242424",
                backgroundColor: isDark ? "#242424" : "#fff",
              }}
            >
              <Logger logs={logs} theme={theme} fontSize={fontSize} />
            </div>
          </Container>
        </Panel>
      </PanelGroup>
    </>
  );
};
