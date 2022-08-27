import React from 'react';
import { AntdBreadcrumbType } from '../utils/breadcrumb';
import demos from './demos';
import About from '../About';
import Home from '../Home';
import Login from '../Login';
import { MyRouteMeta, RouteRecord } from './types';

export const routes: RouteRecord[] = [
  {
    path: '/',
    name: 'index',
    menuName: '首页',
    element: <Home/>,
    meta: {
      title: 'index'
    }
  },
  {
    path: '/home',
    name: 'home',
    menuName: 'Home',
    element: <Home/>,
    meta: {
      title: 'Home',
      navList: ['/']
    }
  },
  {
    path: '/about',
    name: 'about',
    menuName: 'about',
    element: <About/>,
    meta: {
      title: 'About',
      navList: ['/']
    }
  },
  {
    path: '/login',
    name: 'login',
    menuName: '登录',
    element: <Login/>,
    meta: {
      title: 'Login',
      navList: ['/']
    }
  },
  ...demos
];

export function getPath2route (routes: RouteRecord[]):
  Map<string, RouteRecord> {
  return routes.reduce((ret, route) => {
    ret.set(route.path, route);
    return ret;
  }, new Map<string, RouteRecord>());
}

export const path2route = getPath2route(routes);

function getBreadcrumbName (route: RouteRecord | undefined): string {
  const meta: MyRouteMeta | undefined = route?.meta;
  if (meta && meta.title) {
    return meta.title;
  }
  return route?.name || '';
}

export function getPath2breadcrumbRoutes (routes: RouteRecord[]):
  Map<string, AntdBreadcrumbType[]> {
  return routes.reduce((ret, route) => {
    const navList = (route?.meta?.navList || []) as string[];
    const breadcrumbRoute = navList.map((nav) => {
      const routeRecord = path2route.get(nav);
      return {
        path: routeRecord?.path || '',
        breadcrumbName: getBreadcrumbName(routeRecord)
      };
    });
    breadcrumbRoute.push({
      path: route.path,
      breadcrumbName: getBreadcrumbName(route)
    });
    ret.set(route.path, breadcrumbRoute);
    return ret;
  }, new Map<string, AntdBreadcrumbType[]>());
}

export const path2breadcrumbRoutes = getPath2breadcrumbRoutes(routes);
