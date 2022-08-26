import React from 'react';
import useWindowSize from './useWindowSize';

function UseWindowSizeDemo () {
  const size = useWindowSize();
  return (
    <div>
      <p>窗口宽度：{size.width}</p>
      <p>窗口高度：{size.height}</p>
    </div>
  );
}

export default UseWindowSizeDemo;
