import { useEffect, useState } from "react";

export function useElapsed(isRunning: boolean, baseMs: number, startedAtMs: number | null) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const id = setInterval(() => setNow(Date.now()), 250);
    
    return () => clearInterval(id);
  }, [isRunning]);

  const extra = isRunning && startedAtMs ? now - startedAtMs : 0;
  
  return baseMs + extra;
}