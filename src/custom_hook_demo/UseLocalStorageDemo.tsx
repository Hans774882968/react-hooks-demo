import React, { Fragment } from 'react';
import useLocalStorage from './useLocalStorage';
import { Button, message } from 'antd';

type UserInfo = {
  name: string;
  job: string;
  age: number;
  [key: string]: string | number;
}

// 测试分两个方面：1、点击按钮后 localStorage 正确变化。2、刷新后 localStorage 值回到初始值。
// 问题： localStorage.setItem 是同步的且线程不安全，导致我们不能立刻读到新的值。
// 目前是用 await 随便处理一下，自测看上去没问题但感觉非常不对。
function UseLocalStorageDemo () {
  const key = 'userInfo';
  const [obj, setObj] = useLocalStorage<UserInfo>(key, {
    name: 'hans', job: 'ctfer', age: 1
  });
  const modify = async () => {
    if (obj.name === 'hans') {
      await setObj({ name: 'wsw', job: 'feiwu', age: obj.age + 1 });
    } else {
      await setObj({ name: 'hans', job: 'ctfer', age: obj.age + 1 });
    }
    message.success(localStorage.getItem(key));
  };
  return (
    <Fragment>
      <p>name {obj.name}</p>
      <p>job {obj.job}</p>
      <p>age {obj.age}</p>
      <Button type='primary' onClick={modify}>点击修改信息</Button>
    </Fragment>
  );
}

export default UseLocalStorageDemo;
