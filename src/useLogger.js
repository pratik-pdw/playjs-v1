import { useEffect, useState } from 'react';

export const useLogger = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.source === 'iframe-console') {
        setLogs((prevLogs) => [...prevLogs, event.data.payload]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return { logs, setLogs };
};
