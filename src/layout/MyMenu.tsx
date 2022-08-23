import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getMenuItem (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}

function MyMenu () {
  const location = useLocation();

  const items: MenuProps['items'] = [
    getMenuItem('首页', 'index', <MailOutlined />, [
      getMenuItem(<NavLink to="/" className="link">首页</NavLink>, '/'),
      getMenuItem(<NavLink to="/home" className="link">Home</NavLink>, '/home'),
      getMenuItem(<NavLink to="/about" className="link">about</NavLink>, '/about')
    ]),
    getMenuItem('系统功能', 'system', <MailOutlined />, [
      getMenuItem(<NavLink to="/login" className="link">登录</NavLink>, '/login')
    ]),
    getMenuItem('订单', 'order', <MailOutlined />),
    getMenuItem('站内', 'instation', <MailOutlined />)
  ];
  const openKeys = ['index', 'system', 'order', 'instation'];
  const [selectKeys, setSelectedKeys] = useState(['login']);

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location]);

  return (
    <Menu
      style={{ width: 350 }}
      theme='dark'
      mode='inline'
      openKeys={openKeys}
      selectedKeys={selectKeys}
      items={items}
    />
  );
}

export default MyMenu;
