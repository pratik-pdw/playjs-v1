import { Console } from 'console-feed';
import { THEME_TYPE } from './context/ThemeContext';
import { useFontFamily } from './context/FontFamilyContext';
import { LOG_ERROR_ICON, LOG_ICON, LOG_WARN_ICON, LOG_INFO_ICON } from './constants';

export const Logger = ({ logs, theme, fontSize }) => {
  const isDark = theme === THEME_TYPE.DARK;
  const { fontFamily } = useFontFamily();

  return (
    <Console
      logs={logs}
      variant={isDark ? 'dark' : 'light'}
      styles={{
        BASE_FONT_FAMILY: `${fontFamily}, Menlo, Monaco, monospace`,
        BASE_FONT_SIZE: fontSize,
        BASE_LINE_HEIGHT: 1.2,
        LOG_ICON_WIDTH: 20,
        LOG_ICON_HEIGHT: 20,
        LOG_ERROR_ICON,
        LOG_ICON,
        LOG_WARN_ICON,
        LOG_INFO_ICON,
        ...(isDark
          ? {}
          : {
              // Light mode override since the variant doesn't seem to do anything
              LOG_COLOR: 'rgba(0,0,0,0.9)',
              LOG_BORDER: 'rgb(240, 240, 240)',
              LOG_WARN_BACKGROUND: 'hsl(50deg 100% 95%)',
              LOG_WARN_BORDER: 'hsl(50deg 100% 88%)',
              LOG_WARN_COLOR: 'hsl(39deg 100% 18%)',
              LOG_ERROR_BACKGROUND: 'hsl(0deg 100% 97%)',
              LOG_ERROR_BORDER: 'rgb(0deg 100% 92%)',
              LOG_ERROR_COLOR: '#f00',
              LOG_AMOUNT_COLOR: '#fff',
            }),
      }}
    />
  );
};
