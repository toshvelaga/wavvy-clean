import React from "react";
import "./SideNavbar.css";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";

function SideNavbar(props) {
  return (
    <ul className="side-navbar">
      {SidebarData.map((item, index) => (
        <Link to={item.path}>
          <li key={index} className="tablinks">
            <div className="side-navbar-icon">{item.icon}</div>
            <div className="side-navbar-title">{item.title}</div>
          </li>
        </Link>
      ))}
    </ul>
  );
}

export default SideNavbar;
