import React from 'react';
import UseWindowSizeDemo from '../custom_hook_demo/UseWindowSizeDemo';
import UseWindowScrollDemo from '../custom_hook_demo/UseWindowScrollDemo';
import UseLocalStorageDemo from '../custom_hook_demo/UseLocalStorageDemo';

const demos = [
  {
    path: '/useWindowSizeDemo',
    name: 'use window size',
    element: <UseWindowSizeDemo/>,
    meta: {
      title: 'Use Window Size',
      navList: ['/']
    }
  },
  {
    path: '/useWindowScrollDemo',
    name: 'use window scroll',
    element: <UseWindowScrollDemo/>,
    meta: {
      title: 'Use Window Scroll',
      navList: ['/']
    }
  },
  {
    path: '/useLocalStorageDemo',
    name: 'use localStorage',
    element: <UseLocalStorageDemo/>,
    meta: {
      title: 'Use LocalStorage',
      navList: ['/']
    }
  }
];

export default demos;
