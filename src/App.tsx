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
import './App.less';

function App () {
  return (
    <div className="App">
      <Router>
        <NavLink to="/home" className="link">Home</NavLink>
        <NavLink to="/about" className="link">About</NavLink>
        <NavLink to="/login" className="link">Login</NavLink>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
