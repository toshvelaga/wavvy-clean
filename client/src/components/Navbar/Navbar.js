import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { connect } from "react-redux";
import { unauthenticate } from "../../store/actions/actions";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import { SidebarData } from "./SidebarData";
import SideNavbar from "./SideNavbar";

// React Icons: https://react-icons.github.io/
// Navbar: https://www.youtube.com/watch?v=CXa0f4-dWi4&ab_channel=BrianDesign

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const logout = () => {
    localStorage.removeItem("token");
    props.unauthenticate();
    // props.history.push("/login");
  };

  return (
    <>
      {/* sticky top navbar */}
      {/* {sidebar
        ? (document.body.style = "background: grey")
        : (document.body.style = "background: #fff")} */}
      <div
        // style={
        //   sidebar ? { backgroundColor: "grey" } : { backgroundColor: "#fff" }
        // }
        id="top-navbar"
      >
        <span className="user-circle-icon">
          <FaIcons.FaUserCircle size={30} />
        </span>

        <span className="notification-icon">
          <FaIcons.FaBell size={20} />
        </span>
        <span onClick={showSidebar} className="hamburger-icon">
          <FaIcons.FaBars size={20} />
        </span>
      </div>
      {/* fixed side navbar with buttons */}
      <SideNavbar />
      {/* Mobile navbar overlay for small screen size */}

      <IconContext.Provider value={{ color: "black" }}>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="hamburger-icon">
                <FaIcons.FaBars size={20} />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span style={{ marginLeft: "5px" }}>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  unauthenticate: () => dispatch(unauthenticate()),
});

export default connect(null, mapDispatchToProps)(Navbar);
