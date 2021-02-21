import React from 'react';
import './Navbar.css';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Navbar(props) {
  /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
  const myFunction = () => {
    const x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }
  };
  return (
    <div>
      <div className="topnav" id="myTopnav">
        <Link to={`/landingpage/${props.id}`} class="active">
          Subscribe
        </Link>
        <Link to={`/landingpage/${props.id}/social`}>Social</Link>
        <Link to={`/landingpage/${props.id}/support`}>Support</Link>
        {/* <a href="#about">Listen</a> */}
        <a href="javascript:void(0);" className="icon" onClick={myFunction}>
          <FaIcons.FaBars />
        </a>
      </div>
    </div>
  );
}

export default Navbar;
