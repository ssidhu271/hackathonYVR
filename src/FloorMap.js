import React, { useEffect, useRef } from 'react';
import { ReactComponent as AirportMap } from './Map/TerminalMap.svg';



const FloorMap = ({ peopleCount }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!svgRef.current) return;

    const blueArea = svgRef.current.getElementById('BlueTestArea');
    const yellowArea = svgRef.current.getElementById('YellowTestArea');
    const redArea = svgRef.current.getElementById('RedTestArea');

    // Initially hide all
    [blueArea, yellowArea, redArea].forEach(area => {
      if (area) area.style.display = 'none';
    });

    // Show based on peopleCount
    if (peopleCount >= 0 && peopleCount <= 100) blueArea.style.display = '';
    else if (peopleCount > 100 && peopleCount <= 200) yellowArea.style.display = '';
    else if (peopleCount > 200) redArea.style.display = '';
  }, [peopleCount]); // Depend on peopleCount to re-run

  return <AirportMap ref={svgRef} />;
};

export default FloorMap;

