import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Data from './components/Data';
import Navbar from './components/Navbar'; // Import the Navbar component

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} /> 
           {/* NOT  <Route path="/" exact component={Home} /> , the way you 'link' things is different from the way you 'route' things*/}
          <Route path="/about" element={<About />} />
          <Route path="/data" element={<Data />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
