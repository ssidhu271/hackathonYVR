// import React, { useEffect, useRef } from 'react';
// import { ReactComponent as AirportMap } from '../Map/TerminalMap.svg';

// const FloorMap = ({ peopleCount }) => {
//   const svgRef = useRef();

//   // A function to zoom into the area
//   const zoomIntoArea = (area) => {
//     // Example: Zooming in by adjusting the SVG's viewBox to the area's bounding box
//     // This is a simplified example. You might need to adjust the logic based on your SVG's coordinate system and desired zoom level
//     const bbox = area.getBBox();
//     const newViewBox = `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`;
//     svgRef.current.setAttribute('viewBox', newViewBox);
//   };

//   useEffect(() => {
//     if (!svgRef.current) return;

//     const blueArea = svgRef.current.getElementById('BlueTestArea');
//     const yellowArea = svgRef.current.getElementById('YellowTestArea');
//     const redArea = svgRef.current.getElementById('RedTestArea');

//     // Initially hide all
//     [blueArea, yellowArea, redArea].forEach(area => {
//       if (area) area.style.display = 'none';
//     });

//     // Show based on peopleCount
//     if (peopleCount >= 0 && peopleCount <= 100) blueArea.style.display = '';
//     else if (peopleCount > 100 && peopleCount <= 200) yellowArea.style.display = '';
//     else if (peopleCount > 200) redArea.style.display = '';

//     // Attach click event listeners to zoom
//     const areas = [blueArea, yellowArea, redArea];
//     areas.forEach(area => {
//       if (area) {
//         area.addEventListener('click', () => zoomIntoArea(area));
//       }
//     });

//     // Cleanup function to remove event listeners
//     return () => {
//       areas.forEach(area => {
//         if (area) {
//           area.removeEventListener('click', () => zoomIntoArea(area));
//         }
//       });
//     };
//   }, [peopleCount]); // Depend on peopleCount to re-run

//   return <AirportMap ref={svgRef} />;
// };

// export default FloorMap;



import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import cameraIconUrl from '../images/camera.webp';

const VancouverAirportMap = () => {
  const position = [49.1947, -123.1788];

  const bounds = [
    [49.1867, -123.1938], 
    [49.2027, -123.1638]  
  ];


  const markers = [
    { id: 1, position: [49.1951, -123.1776], info: 'Marker 1 Info', peopleCount: 20 },
    { id: 2, position: [49.1940, -123.1760], info: 'Marker 2 Info', peopleCount: 100 },
  ];

  const cameraIcon = L.icon({
    iconUrl: cameraIconUrl,
    iconSize: [25, 25], 
    iconAnchor: [12.5, 25], 
    popupAnchor: [0, -25], 
  });


    // determine circle color based on peopleCount
    const getCircleColor = (peopleCount) => {
      if (peopleCount <= 50) return 'green';
      else if (peopleCount <= 100) return 'yellow';
      else return 'red';
    };

    return (
      <MapContainer
        center={position}
        zoom={16}
        style={{ height: '400px', width: '100%' }}
        minZoom={16}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map(marker => (
          <React.Fragment key={marker.id}>
            <Marker 
              position={marker.position} 
              icon={cameraIcon}
            >
              <Popup>{marker.info}</Popup>
            </Marker>
            <Circle
              center={marker.position}
              color={getCircleColor(marker.peopleCount)}
              fillColor={getCircleColor(marker.peopleCount)}
              fillOpacity={0.5}
              radius={50} 
            />
          </React.Fragment>
        ))}
      </MapContainer>
    );
  };
export default VancouverAirportMap;
