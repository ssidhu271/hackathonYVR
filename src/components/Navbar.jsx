// import React from "react";
// import "../styles/Navbar.css";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <div className="navbar">
//       <h2>Sidebar Title</h2>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>{" "}
//         <li>
//           <Link to="/graph">Graph</Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { FaMap, FaChartBar } from "react-icons/fa"; // Import icons from react-icons library
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`navbar ${isOpen ? "open" : ""}`}>
      {isOpen && (
        <div className="sidebar-header">
          <h2>Crow's Nest</h2>
          <span className="close-toggle-icon" onClick={toggleNavbar}>
            <IoIosArrowBack />
          </span>
        </div>
      )}
      {!isOpen && (
        <span className="open-toggle-icon" onClick={toggleNavbar}>
          <IoIosArrowForward />
        </span>
      )} 
      {isOpen && (
        <div className = "open-sidebar-options">
          <ul>
            <li>
              <Link to="/">
                <div className="icon">
                  <FaMap />
                </div>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/graph">
                <div className="icon">
                  <FaChartBar />
                </div>
                Graph
              </Link>
            </li>
          </ul>
        </div>
      )}
      {!isOpen && (
        <div>
          {/* Show map and graph icons when sidebar is closed */}
          <ul>
            <li>
              <Link to="/">
                <div className="closed-icon">
                  <FaMap />
                </div>
              </Link>
            </li>
            <li>
              <Link to="/graph">
                <div className="closed-icon">
                  <FaChartBar />
                </div>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
