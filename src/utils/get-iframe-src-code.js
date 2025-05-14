import * as babel from '@babel/standalone';
import { bindConsoleFeedToIframe } from './bind-console-feed-to-iframe';

const getTranspiledJavascriptCode = (jsCode) => {
  return babel.transform(jsCode, {
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
  }).code;
};

export const getIframeSrcCode = (htmlCode, cssCode, jsCode) => {
  try {
    const transpiledJavascriptCode = getTranspiledJavascriptCode(jsCode);
    const html = `
          <!DOCTYPE html>
          <html lang="en"> 
          <head>
            <style>
              ${cssCode}
            </style>
            ${bindConsoleFeedToIframe()}
            <script type="module" defer>
              ${transpiledJavascriptCode}
            </script>
          </head>
          <body>
          ${htmlCode}
          </body>
        `;
    const blob = new Blob([html], { type: 'text/html' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error(error.message);
  }
};
