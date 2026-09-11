import { useEffect, useState } from "react";

type WindowDimensions = {
  width: number | undefined;
  height: number | undefined;
};

const useWindowDimensions = (): WindowDimensions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    let frame = 0;
    function read(): void {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Resize fires far faster than we can usefully re-render, and this hook
    // drives the 3D scene's layout — so collapse a burst into one update.
    function handleResize(): void {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(read);
    }
    read();
    window.addEventListener("resize", handleResize);
    return (): void => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty array ensures that effect is only run on mount

  return windowDimensions;
};

export default useWindowDimensions;
