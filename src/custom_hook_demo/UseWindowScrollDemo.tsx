import React from 'react';
import useWindowScroll from './useWindowScroll';

function UseWindowScrollDemo () {
  const offset = useWindowScroll();
  return (
    <div style={{ height: '10000px', width: '10000px', position: 'absolute', backgroundColor: 'beige' }}>
      <p>滚动x：{offset.x}</p>
      <p>滚动y：{offset.y}</p>
    </div>
  );
}

export default UseWindowScrollDemo;
