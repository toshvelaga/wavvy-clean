import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
import { connect } from 'react-redux';
import { unauthenticate } from '../../store/actions/actions';

import './Navbar.css';
import { IconContext } from 'react-icons';

import { Link } from 'react-router-dom';
import Logout from '../Logout/Logout';

// React Icons: https://react-icons.github.io/
// Navbar: https://www.youtube.com/watch?v=CXa0f4-dWi4&ab_channel=BrianDesign

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const logout = () => {
    localStorage.removeItem('token');
    props.unauthenticate();
    // props.history.push("/login");
  };

  const SidebarData = [
    {
      title: 'Podcasts',
      path: '/podcasts',
      icon: <FaIcons.FaPodcast />,
      cName: 'nav-text',
    },
    {
      title: 'Episodes',
      path: '/episodes',
      icon: <AiIcons.AiFillAudio />,
      cName: 'nav-text',
    },
    {
      title: 'Websites',
      path: '/website-settings',
      icon: <MdIcons.MdWeb />,
      cName: 'nav-text',
    },
    // {
    // 	title: "Analytics",
    // 	path: "/analytics",
    // 	icon: <IoIcons.IoMdAnalytics />,
    // 	cName: "nav-text",
    // },
    // {
    // 	title: "Monetization",
    // 	path: "/integrations",
    // 	icon: <MdIcons.MdAttachMoney />,
    // 	cName: "nav-text",
    // },
    {
      title: 'Settings',
      path: '/settings',
      icon: <IoIcons.IoMdSettings />,
      cName: 'nav-text',
    },
  ];

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div id="profile-icon">
            <span style={{ fontSize: '1rem', marginRight: 5 }}>Profile</span>
            <Logout fx={logout} title="Logout" />
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              {/* <Link to="#" className="menu-bars">
								<AiIcons.AiOutlineClose />
							</Link> */}
              {SidebarData.map((item, index) => (
                <li key={index} className={item.cName}>
                  <Link className="icons" to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </li>
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
