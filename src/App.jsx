import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FloorMap from './scripts/FloorMap';
import GraphPage from './pages/GraphPage'; // Adjust the import path as necessary

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <div className="mapContainer">
              <FloorMap peopleCount={900} />
            </div>
          } />
          <Route path="/graph" element={<GraphPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
