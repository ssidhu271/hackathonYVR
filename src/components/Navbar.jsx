import React, { useState } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { FaMap, FaChartBar, FaBell } from "react-icons/fa"; // Import icons from react-icons library
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import APIService from '../services/APIservice.js'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelection = async (location) => {
    const staffName = "Harrison d";
    const staffEmail = "harrisondijon@gmail.com";
    const messageType = "Maintenance Required";

    try {
      const apiService = new APIService();
      const response = await apiService.sendNotification(staffName, staffEmail, location, messageType);
      console.log(response.message);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
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
                  <li onClick={() => handleSelection("Gate 5")}>
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
