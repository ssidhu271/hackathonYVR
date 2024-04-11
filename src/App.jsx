import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import FloorMap from './scripts/FloorMap'; 

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="mapContainer">
        <FloorMap peopleCount={900} /> 
      </div>
    </div>
  );
}

export default App;
