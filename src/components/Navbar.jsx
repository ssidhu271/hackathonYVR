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
import { FaMap, FaChartBar, FaBell } from "react-icons/fa"; // Import icons from react-icons library
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelection = (location) => {
    //call API endpoint with selected location
    console.log(`Location selected: ${location}`);
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
        <div className="open-sidebar-options">
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
            <li>
              <a
                href="#"
                className="notification-link"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(); 
                }}
              >
                <div className="icon">
                  <FaBell />
                </div>
                Notification Manager
              </a>
              {isDropdownOpen && (
                <ul className="dropdown">
                  <li onClick={() => handleSelection("Location 1")}>
                    Harrison d (Facilities)
                  </li>
                </ul>
              )}
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
            <li>
        <a
          href="#"
          className="closed-icon"
          onClick={(e) => {
            e.preventDefault();
            toggleNavbar();
            toggleDropdown();
          }}
        >
          <div className="icon">
            <FaBell />
          </div>
        </a>
      </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
