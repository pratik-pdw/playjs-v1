export const bindConsoleFeedToIframe = () => {
  return `
        <script>
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
    `;
};
