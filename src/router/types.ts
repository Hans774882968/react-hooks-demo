export interface MyRouteMeta {
  title?: string;
  navList?: string[];
}

export interface RouteRecord {
  path: string;
  name: string;
  menuName: string;
  element: JSX.Element;
  meta?: MyRouteMeta;
}
