import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { CodeEditor } from "./Editor";
import { useEffect, useState } from "react";
import {
  FaBolt,
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
import { FONT_SIZE, useFontSize } from "./context/FontSizeContext";

const DEFAULT_CODE_VALUE = `/* Write your code from here...*/\nconsole.log('Hello, World 🥳')`;

export const AppMain = () => {
  const [value, setValue] = useState(DEFAULT_CODE_VALUE);
  const { logs, setLogs } = useLogger();
  const { theme, setTheme } = useTheme();
  const { fontSize, setFontSize } = useFontSize();

  function handleEditorChange(value) {
    setValue(value);
  }

  function handleRun() {
    setLogs([]);
    try {
      // eslint-disable-next-line no-new-func
      new Function(value)();
    } catch (error) {
      console.error(error);
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
    setFontSize(FONT_SIZE[fs]);
  };

  const isDark = theme === THEME_TYPE.DARK;

  return (
    <>
      <Box bg="#041C32" w="100%" p={3} color="white">
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex alignItems={"center"} gap={2}>
            <FaSquareJs />
            <Text as="b" fontSize="md">
              PlayJS
            </Text>
          </Flex>
          <Flex alignItems={"center"} gap={5}>
            <Button leftIcon={<FaBolt />} size="sm" onClick={handleRun}>
              Run
            </Button>
            <ButtonGroup aria-label="Font Size" isAttached spacing="6">
              <Button leftIcon={<FaFont />} size="sm" disabled>
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
      <SimpleGrid marginTop={0} columns={2} spacing={0}>
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
      </SimpleGrid>
    </>
  );
};
