import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import MyMenu from './layout/MyMenu';
import BreadCrumb from './layout/BreadCrumb';
import { routes } from './router';
import styles from './App.module.less';

function App () {
  return (
    <div className={styles.App}>
      <Router>
        <BreadCrumb />

        <div className={styles['app-body']}>
          <MyMenu />
          <div className={styles['main-content-wrapper']}>
            <Routes>
              {
                routes.map(route => {
                  return <Route path={route.path} key={route.path} element={route.element} />;
                })
              }
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
