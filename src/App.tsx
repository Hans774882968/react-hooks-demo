import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes
} from 'react-router-dom';
import About from './About';
import Home from './Home';
import Login from './Login';
import MyMenu from './layout/MyMenu';
import BreadCrumb from './layout/BreadCrumb';
import styles from './App.module.less';

function App () {
  return (
    <div className={styles.App}>
      <Router>
        <BreadCrumb />
        <NavLink to="/" className="link"></NavLink>
        <NavLink to="/home" className="link"></NavLink>
        <NavLink to="/about" className="link"></NavLink>
        <NavLink to="/login" className="link"></NavLink>

        <div className={styles['app-body']}>
          <MyMenu />
          <div className={styles['main-content-wrapper']}>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/login" element={<Login/>} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
