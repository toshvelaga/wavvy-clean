import React, { Component } from 'react';
import './Logout.css';
import * as MdIcons from 'react-icons/md';

// https://blog.campvanilla.com/reactjs-dropdown-menus-b6e06ae3a8fe

class Logout extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
    return (
      <div>
        <button className="account-profile-circle" onClick={this.showMenu}>
          <MdIcons.MdAccountCircle
            className="profile-icon"
            size={36}
            onClick={this.props.onClick}
          />
        </button>

        {this.state.showMenu ? (
          <div style={{ textAlign: 'center' }} className="logout-menu">
            <button onClick={this.props.fx} className="logout-menu-button">
              {this.props.title}
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Logout;
