import { Hook, Unhook } from "console-feed";
import { useEffect, useState } from "react";

export const useLogger = () => {
  const [logs, setLogs] = useState([]);

  // run once!
  useEffect(() => {
    const hookedConsole = Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    );
    return () => Unhook(hookedConsole);
  }, []);

  return { logs, setLogs };
};
