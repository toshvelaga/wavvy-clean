import React, { Component } from "react";
import * as BsIcons from "react-icons/bs";
import "./Card.css";

// https://blog.campvanilla.com/reactjs-dropdown-menus-b6e06ae3a8fe

class Card extends Component {
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
			document.addEventListener("click", this.closeMenu);
		});
	}

	closeMenu() {
		this.setState({ showMenu: false }, () => {
			document.removeEventListener("click", this.closeMenu);
		});
	}

	render() {
		return (
			<div style={{ float: "right", marginRight: "10px" }}>
				<button className="three-dots" onClick={this.showMenu}>
					<BsIcons.BsThreeDots size={30} />
				</button>

				{this.state.showMenu ? (
					<div className="menu">
						<button onClick={this.props.fx} className="menu-button">
							{this.props.title}
						</button>
						{/* <br></br>
						<button> Menu item 2 </button>
						<br></br>
						<button> Menu item 3 </button> */}
					</div>
				) : null}
			</div>
		);
	}
}

export default Card;
