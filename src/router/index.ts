import { AntdBreadcrumbType } from '../utils/breadcrumb';

interface MyRouteMeta {
  title: string;
  navList: string[];
}

interface RouteRecord {
  path: string;
  name: string;
  meta?: MyRouteMeta;
}

export const routes = [
  {
    path: '/',
    name: 'index',
    meta: {
      title: 'index'
    }
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: 'Home',
      navList: ['/']
    }
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: 'About',
      navList: ['/']
    }
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login',
      navList: ['/']
    }
  }
] as RouteRecord[];

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
