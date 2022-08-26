import { useEffect, useState } from 'react';

interface WindowSize {
    width: number;
    height: number;
}

const useWindowSize = () => {
  const [size, setSize] = useState<WindowSize>({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });
  useEffect(() => {
    const onWindowResize = () => {
      setSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      });
    };
    addEventListener('resize', onWindowResize);
    return () => {
      removeEventListener('resize', onWindowResize);
    };
  }, []);
  return size;
};

export default useWindowSize;
