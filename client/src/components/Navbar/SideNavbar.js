import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import "./SideNavbar.css";

function SideNavbar(props) {
  return (
    <ul className="side-navbar">
      <li className="tablinks">
        <div className="side-navbar-icon">
          <FaIcons.FaPodcast />
        </div>
        <div className="side-navbar-title">Podcasts</div>
      </li>

      <li className="tablinks">
        <div className="side-navbar-icon">
          <AiIcons.AiFillAudio size={20} />
        </div>
        <div className="side-navbar-title">Company</div>
      </li>

      <li className="tablinks">
        <div className="side-navbar-icon">
          <FaIcons.FaChartBar size={20} />
        </div>
        <div className="side-navbar-title">Analytics</div>
      </li>

      <li className="tablinks">
        <div className="side-navbar-icon">
          <FaIcons.FaCog size={20} />
        </div>
        <div className="side-navbar-title">Settings</div>
      </li>
    </ul>
  );
}

export default SideNavbar;
