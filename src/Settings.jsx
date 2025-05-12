import {
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  ButtonGroup,
  Button,
  Divider,
  Box,
  Checkbox,
} from '@chakra-ui/react';
import { FaFont } from 'react-icons/fa6';
import { IoSettingsSharp } from 'react-icons/io5';
import { FONT_SIZE, useSettingsContext } from './context/SettingsContext';
import { PiListNumbersBold } from 'react-icons/pi';
import { VscWordWrap } from 'react-icons/vsc';
import { GoProjectRoadmap } from 'react-icons/go';
import { useRef } from 'react';

export const Settings = () => {
  const popoverContentRef = useRef();
  const {
    settings: { fontSize, lineNumbers, wordWrap, minimap },
    setSettings,
  } = useSettingsContext();

  const handleFontSizeClick = (fs) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      fontSize: FONT_SIZE[fs],
    }));
  };

  return (
    <Popover id="popover-container" initialFocusRef={popoverContentRef} closeOnBlur autoFocus trigger="click">
      <PopoverTrigger>
        <IconButton size="sm" aria-label="Settings" icon={<IoSettingsSharp />}>
          Trigger
        </IconButton>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton ref={popoverContentRef} />
        <PopoverHeader color={'black'}>Settings</PopoverHeader>
        <PopoverBody>
          <Text marginLeft={2} fontSize={'sm'} as="b" color={'black'}>
            Editor & Console
          </Text>
          <ButtonGroup marginTop={2} display={'flex'} aria-label="Font Size" isAttached spacing="6">
            <Button justifyContent={'start'} flexGrow={'1'} leftIcon={<FaFont />} size="sm" disabled>
              Font Size
            </Button>
            {Object.keys(FONT_SIZE).map((fs) => (
              <Button onClick={() => handleFontSizeClick(fs)} key={fs} size="sm">
                <Text as={FONT_SIZE[fs] === fontSize ? 'u' : ''}>{FONT_SIZE[fs]}</Text>
              </Button>
            ))}
          </ButtonGroup>
          <Divider marginTop={3} marginBottom={1} />
          <Text paddingLeft={2} fontSize={'sm'} as="b" color={'black'}>
            Editor
          </Text>
          <Box marginTop={2} color={'black'}>
            <ButtonGroup display={'flex'} isAttached>
              <Button justifyContent={'start'} flexGrow={'1'} leftIcon={<PiListNumbersBold />} size="sm" disabled>
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

          <Box marginTop={2} color={'black'}>
            <ButtonGroup display={'flex'} isAttached>
              <Button justifyContent={'start'} flexGrow={'1'} leftIcon={<VscWordWrap />} size="sm" disabled>
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

          <Box marginTop={2} color={'black'}>
            <ButtonGroup display={'flex'} isAttached>
              <Button justifyContent={'start'} flexGrow={'1'} leftIcon={<GoProjectRoadmap />} size="sm" disabled>
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
  );
};
