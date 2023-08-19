import { useEffect, useState } from "react";

export function useWindowSize(waitTime = 350) {
  const isSSR = typeof window === "undefined";
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: isSSR ? 1200 : window.innerWidth,
    height: isSSR ? 800 : window.innerHeight,
  });

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | undefined;

    function handleResize() {
      if (!timerId) {
        timerId = setTimeout(() => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
          timerId = undefined;
        }, waitTime);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timerId);
      window.removeEventListener("resize", handleResize);
    };
  }, [waitTime]);

  return { width: windowSize.width, height: windowSize.height };
}
