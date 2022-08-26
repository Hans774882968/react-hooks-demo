import { useEffect, useState } from 'react';

interface Scroll {
  x: number;
  y: number;
}

const useWindowScroll = () => {
  const [ofs, setOfs] = useState<Scroll>({
    x: window.scrollX,
    y: window.scrollY
  });
  useEffect(() => {
    const onWindowScroll = () => {
      setOfs({
        x: window.scrollX,
        y: window.scrollY
      });
    };
    addEventListener('scroll', onWindowScroll);
    return () => {
      removeEventListener('scroll', onWindowScroll);
    };
  }, []);
  return ofs;
};

export default useWindowScroll;
