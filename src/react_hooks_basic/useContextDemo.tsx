import { Button } from 'antd';
import React, { createContext, useContext, useState } from 'react';

const CountContext = createContext(0);
const Mid1Context = createContext({ count: -100 });

function Son () {
  const val1 = useContext(CountContext), val2 = useContext(Mid1Context);
  console.log('val2', val2);

  return (
    <>
      <p>App传递的Context：{val1}</p>
      <p>Mid1传递的Context：{val2.count}</p>
    </>
  );
}

function Mid3 () {
  return <Son />;
}

function Mid2 () {
  return <Mid3 />;
}

function Mid1 () {
  const [count, setCount] = useState(-100);
  return (
    <div>
      <Button type='primary' onClick={() => setCount(count + 1)}>Mid1的按钮</Button>
      <p>Mid1.count = {count}</p>
      <Mid1Context.Provider value={{ count }}>
        <Mid2 />
      </Mid1Context.Provider>
    </div>
  );
}

function SubComponentChangeParentState () {
  const C = createContext<{n: number, setN: (n: number) => any}>({
    n: 0, setN: (n: number) => n
  });

  function Sub () {
    const { n: m, setN: setM } = useContext(C);
    const add = () => setM(m + 1);
    return (
      <>
        <p>子组件改变父组件状态：{m}</p>
        <Button type='primary' onClick={add}>子组件改变父组件状态：加1</Button>
      </>
    );
  }

  const [n, setN] = useState(0);
  const add = () => setN(n + 2);
  return (
    <>
      <p>父组件：{n}</p>
      <Button type='primary' onClick={add}>父组件：加2</Button>
      <C.Provider value={{ n, setN }}>
        <Sub />
      </C.Provider>
    </>
  );
}

export default function UseContextDemo () {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>UseContextDemo.count = {count}</p>
      <Button type='primary' onClick={() => setCount(count + 1)}>UseContextDemo的按钮</Button>
      <CountContext.Provider value={count}>
        <Mid1 />
      </CountContext.Provider>

      <SubComponentChangeParentState />
    </div>
  );
}
