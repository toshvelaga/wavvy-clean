import React, { useState, useEffect } from "react";
import RoundButton from "../RoundButton/RoundButton";
import "./WebsiteContainer.css";
import * as MdIcons from "react-icons/md";
import Card from "../Card/Card";
import axios from "axios";
import Modal from "react-modal";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		backgroundColor: "black",
		borderRadius: "5px",
	},
};

function WebsiteContainer(props) {
	const headers = { jwt_token: localStorage.token };

	return (
		<div>
			<div className="podcast-container">
				<img className="podcast-image" src={props.coverImage} />
				<div className="podcast-info">
					<h3 style={{ color: "#fff", marginBottom: ".5em" }}>
						{props.podcastName}
					</h3>
					<p
						style={{
							color: "#fff",
							marginBottom: ".5em",
						}}
					>
						{props.podcastDesc}
					</p>
					<div>
						<RoundButton
							title={"Settings"}
							onClick={props.fx1}
							icon={<MdIcons.MdCreate size={22} />}
						/>
						<RoundButton
							title={"View Epsiodes"}
							onClick={props.fx2}
							icon={<MdIcons.MdRemoveRedEye size={22} />}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WebsiteContainer;

// import React from "react";
// import "./WebsiteContainer.css";

// function WebsiteContainer(props) {
// 	return (
// 		<>
// 			<div className="Website-Container">
// 				<h2 style={{ color: "#fff", marginBottom: ".5em" }}>
// 					{props.podcastName}
// 				</h2>
// 				<button className="website-container-button" onClick={props.edit}>
// 					Edit Website
// 				</button>
// 				<button className="website-container-button" onClick={props.view}>
// 					View Website
// 				</button>
// 			</div>
// 		</>
// 	);
// }

// export default WebsiteContainer;
