import React from 'react';
import UseWindowSizeDemo from '../custom_hook_demo/UseWindowSizeDemo';
import UseWindowScrollDemo from '../custom_hook_demo/UseWindowScrollDemo';

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
  }
];

export default demos;
