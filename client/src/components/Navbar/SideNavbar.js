import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import "./SideNavbar.css";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";

function SideNavbar(props) {
  return (
    <ul className="side-navbar">
      {SidebarData.map((item, index) => {
        return (
          <Link to={item.path}>
            <li key={index} className="tablinks">
              <div className="side-navbar-icon">{item.icon}</div>
              <div className="side-navbar-title">{item.title}</div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}

export default SideNavbar;
