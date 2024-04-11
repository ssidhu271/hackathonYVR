// Home.jsx
import React from 'react';
import FloorMap from '../scripts/FloorMap'; 
import '../styles/Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <FloorMap peopleCount={900} />
    </div>
  );
};

export default Home;


