import React from 'react';
import UseWindowSizeDemo from '../custom_hook_demo/UseWindowSizeDemo';
import UseWindowScrollDemo from '../custom_hook_demo/UseWindowScrollDemo';
import UseLocalStorageDemo from '../custom_hook_demo/UseLocalStorageDemo';
import TodoList from '../TodoList';
import { RouteRecord } from './types';
import UseStateDemo from '../react_hooks_basic/useStateDemo';
import UseContextDemo from '../react_hooks_basic/useContextDemo';

const demos: RouteRecord[] = [
  {
    path: '/useWindowSizeDemo',
    name: 'use window size',
    menuName: '实时获取窗口尺寸',
    element: <UseWindowSizeDemo/>,
    meta: {
      title: 'Use Window Size',
      navList: ['/']
    }
  },
  {
    path: '/useWindowScrollDemo',
    name: 'use window scroll',
    menuName: '实时获取滚动offset',
    element: <UseWindowScrollDemo/>,
    meta: {
      title: 'Use Window Scroll',
      navList: ['/']
    }
  },
  {
    path: '/useLocalStorageDemo',
    name: 'use localStorage',
    menuName: '自动同步信息到localStorage的自定义hook',
    element: <UseLocalStorageDemo/>,
    meta: {
      title: 'Use LocalStorage',
      navList: ['/']
    }
  },
  {
    path: '/todoList',
    name: 'todoList',
    menuName: 'react hooks demo：TODO List',
    element: <TodoList/>,
    meta: {
      title: 'TODO List',
      navList: ['/']
    }
  },
  {
    path: '/useStateDemo',
    name: 'useStateDemo',
    menuName: 'Use State Demo',
    element: <UseStateDemo/>,
    meta: {
      title: 'Use State Demo',
      navList: ['/']
    }
  },
  {
    path: '/useContextDemo',
    name: 'useContextDemo',
    menuName: 'Use Context Demo',
    element: <UseContextDemo/>,
    meta: {
      title: 'Use Context Demo',
      navList: ['/']
    }
  }
];

export default demos;
