import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import "./SideNavbar.css";
import { Link } from "react-router-dom";

function SideNavbar(props) {
  return (
    <ul className="side-navbar">
      <Link to="/podcasts">
        <li className="tablinks">
          <div className="side-navbar-icon">
            <FaIcons.FaPodcast size={24} />
          </div>
          <div className="side-navbar-title">Podcasts</div>
        </li>
      </Link>

      <Link to="/episodes">
        <li className="tablinks">
          <div className="side-navbar-icon">
            <AiIcons.AiFillAudio size={24} />
          </div>
          <div className="side-navbar-title">Episodes</div>
        </li>
      </Link>

      <Link to="/website-settings">
        <li className="tablinks">
          <div className="side-navbar-icon">
            <FaIcons.FaChartBar size={24} />
          </div>
          <div className="side-navbar-title">Websites</div>
        </li>
      </Link>

      <Link to="/settings">
        <li className="tablinks">
          <div className="side-navbar-icon">
            <FaIcons.FaCog size={24} />
          </div>
          <div className="side-navbar-title">Settings</div>
        </li>
      </Link>
    </ul>
  );
}

export default SideNavbar;
