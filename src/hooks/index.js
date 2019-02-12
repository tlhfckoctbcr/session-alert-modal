import { useEffect, useRef } from "react";

export function useInterval(cb, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = cb;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      }
    }
  }, [delay]);
}

