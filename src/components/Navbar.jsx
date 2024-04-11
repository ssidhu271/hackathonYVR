import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>Sidebar Title</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>{" "}
        <li>
          <Link to="/graph">Graph</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
