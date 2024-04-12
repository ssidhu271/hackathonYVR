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

import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import cameraIconUrl from "../images/circle.png";
import "./VancouverAirportMap.css";
import IssueTypesPieChart from '../components/PieChart'; 
import BarChart from '../components/BarChart'; 
import PredictedGraph from '../components/PredictedGraph';
import ActivityTypeChart from "../components/ActivityTypeChart";
import axios from 'axios';
import useSendLuggageData from '../Database/sendLuggageData';


const fetchBathroomLocations = async () => {
  const query = `
    [out:json];
    (
      node["amenity"="toilet"](around:3000,49.1947,-123.1788);
      way["amenity"="toilet"](around:3000,49.1947,-123.1788);
      relation["amenity"="toilet"](around:3000,49.1947,-123.1788);
    );
    out center;
  `;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
  try {
    const response = await axios.get(url);
    return response.data.elements.map(el => ({
      id: el.id,
      position: [el.lat, el.lon],
      info: 'Public Toilet'
    }));
  } catch (error) {
    console.error('Failed to fetch bathroom locations:', error);
  }
};






// const issueData = {
//   labels: ['Unattended Baggage', 'Waste and Clutter', 'Cleanliness'],
//   values: [300, 150, 100], // hard coded, replace with actual data
// };

const VancouverAirportMap = () => {
  const position = [49.1947, -123.1788];
  const [fetchedData, setFetchedData] = useState(null);

  const bounds = [
    [49.1867, -123.1888],
    [49.2027, -123.1588],
  ];

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get_counts")
      .then((response) => response.json())
      .then((data) => setFetchedData(data));
    console.log(fetchedData);
  }, []);

  useEffect(() => {
    if (fetchedData) {
      setMarkers((prevMarkers) => [
        ...prevMarkers,
        {
          id: fetchedData.camera1.person,
          position: [49.1951, -123.1776],
          info: "Camera 1 from backend",
          peopleCount: fetchedData.camera1.person,
        },
        {
          id: fetchedData.camera2.person,
          position: [49.194, -123.176],
          info: "Camera 2 from backend",
          peopleCount: fetchedData.camera2.person,
        },
      ]);
    }
  }, [fetchedData]);

  const [markers, setMarkers] = useState([
    {
      id: 1,
      position: [49.1948, -123.175],
      info: "Marker 1 Info",
      peopleCount: 20,
    },
    {
      id: 2,
      position: [49.1946, -123.175],
      info: "Marker 2 Info",
      peopleCount: 100,
    },
  ]);

  const cameraIcon = L.icon({
    iconUrl: cameraIconUrl,
    iconSize: [20, 20],
    iconAnchor: [12.5, 25],
    popupAnchor: [0, -25],
  });

  const overcrowdingThreshold = 200;
  const sendLuggageData = useSendLuggageData();


  const addMarker = useCallback((newMarker, duration = 5000) => {
    setMarkers((currentMarkers) => [...currentMarkers, newMarker]);

    // New: Send the peopleCount to the backend
    fetch("http://localhost:3001/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ peopleCount: newMarker.peopleCount }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => {
        console.error("Error:", error);
      });

    setTimeout(() => {
      setMarkers((currentMarkers) =>
        currentMarkers.filter((marker) => marker.id !== newMarker.id)
      );
    }, duration);
  }, []);

  // Remove a marker by id
  const removeMarker = (id) => {
    setMarkers((currentMarkers) =>
      currentMarkers.filter((marker) => marker.id !== id)
    );
  };

  // determine circle color based on peopleCount
  const getCircleColor = (peopleCount) => {
    if (peopleCount <= 50) return "yellow";
    else if (peopleCount <= 100) return "orange";
    else return "red";
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newMarker = {
        id: Date.now(),
        position: [49.195, -123.177],
        info: "Dynamic Issue Detected",
        peopleCount: Math.floor(Math.random() * 100),
      };

      addMarker(newMarker, 10000);
    }, 15000);

    const luggageIntervalId = setInterval(() => {
      sendLuggageData();
    }, 15000);

    return () => {
      clearInterval(intervalId);
      clearInterval(luggageIntervalId);
    };
  }, [addMarker, sendLuggageData]);

  const totalPeople = markers.reduce(
    (acc, marker) => acc + marker.peopleCount,
    0
  );


  useEffect(() => {
    fetchBathroomLocations().then(bathrooms => {
      setMarkers(prevMarkers => [...prevMarkers, ...bathrooms]);
    });
  }, []);

  return (
    <>
      <MapContainer
        center={position}
        zoom={16}
        style={{ height: "400px", width: "100%" }}
        minZoom={16}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <React.Fragment key={marker.id}>
            <Marker position={marker.position} icon={cameraIcon}>
              <Popup>
                {marker.info} <br />
                People Count: {marker.peopleCount}
              </Popup>
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



      {/* CHARTS AND GRAPHS START */}
      <div className="chartsWrapper" style={{width: 100 + '%', height: 100 + '%'}}>
  <div className="chartContainer">
    {/* <IssueTypesPieChart issueData={issueData} /> */}
    <IssueTypesPieChart/>
  </div>
  <div className="predictedGraphContainer" style={{zIndex: '3'}}>
    <PredictedGraph />
  </div><div className="barChartContainer" style={{zIndex: '502'}}>
    <BarChart markers={markers} />
  </div>
  <div className="activityTypeContainer" style={{zIndex: '501'}}>
    <ActivityTypeChart />
  </div>
  
</div>


      {/* CHARTS AND GRAPHS END */}


      {/* {totalPeople > overcrowdingThreshold && (
        <div className="overcrowdingAlert">
          Attention: High traffic detected! Current count: {totalPeople}
        </div>
      )} */}
    </>
  );
};

export default VancouverAirportMap;
