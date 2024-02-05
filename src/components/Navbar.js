import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li> 
        {/* the '/whatever' has to match what's in the router defined in App */}
        <li><Link to="/data">Data</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
