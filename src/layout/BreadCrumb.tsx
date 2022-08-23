import React, { useEffect, useState } from 'react';
import { PageHeader } from 'antd';
import styles from './BreadCrumb.module.less';
import { path2breadcrumbRoutes } from '../router';
import { AntdBreadcrumbType } from '../utils/breadcrumb';
import { Link, useLocation } from 'react-router-dom';

function BreadCrumb () {
  const location = useLocation();

  useEffect(() => {
    const newBreadcrumbRoutes = path2breadcrumbRoutes.get(location.pathname);
    if (newBreadcrumbRoutes) {
      setBreadcrumbRoutes(newBreadcrumbRoutes);
    }
  }, [location]);

  const [breadcrumbRoutes, setBreadcrumbRoutes] = useState([] as AntdBreadcrumbType[]);

  // 自定义面包屑dom，链接直接取route.path，而非paths.join('/')
  function itemRender (route: AntdBreadcrumbType, _: object, routes: AntdBreadcrumbType[]) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={route.path}>{route.breadcrumbName}</Link>
    );
  }

  return (
    <PageHeader
      className={styles['site-page-header']}
      breadcrumb={{ routes: breadcrumbRoutes, itemRender }}
    />
  );
}

export default BreadCrumb;
