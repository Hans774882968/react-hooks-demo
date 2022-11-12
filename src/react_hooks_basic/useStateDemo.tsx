import React, { useState } from 'react';
import { Button } from 'antd';

let count = 0;

function Rerender () {
  ++count;
  const [num, setNum] = useState(0);
  const add = (delta: number) => {
    setNum(num + delta);
  };
  console.log('count =', count);

  return (
    <div>
      <p>num = {num}</p>
      <Button type='primary' onClick={() => add(1)}>加1</Button>
      <Button type='primary' onClick={() => add(0)}>加0</Button>
    </div>
  );
}

function Mid () {
  return (
    <div>
      <p>Mid</p>
      <Rerender />
    </div>
  );
}

export default function UseStateDemo () {
  const [num, setNum] = useState(0);
  const add = () => {setNum(num + 1);};
  return (
    <div>
      <p onClick={add}>UseStateDemo {num}</p>
      <Mid />
    </div>
  );
}

// export default function UseStateDemo () {
//   const [state, setState] = useState(() => {
//     return [1, 2, 3].map(item => item * 10);
//   });

//   // 点击button不会触发组件更新，组件不会重新渲染，因此clg不会打印
//   console.log('组件更新了');

//   return (
//     <div>
//       <p>{state.join('-')}</p>
//       <button onClick={() => setState(state)}>addItem</button>
//     </div>
//   );
// }
