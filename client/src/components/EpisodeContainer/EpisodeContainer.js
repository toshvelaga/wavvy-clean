import React, { useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import RoundButton from "../RoundButton/RoundButton";
import Card from "../Card/Card";
import "./EpisodeContainer.css";
import secondsToHms from "../../utils/secondsToHms";
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

function EpisodeContainer(props) {
	const [modalIsOpen, setIsOpen] = useState(false);

	var subtitle;

	function openModal() {
		setIsOpen(true);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = "#f00";
	}

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<div>
			<div className="episode-container">
				<img className="episode-image" src={props.episodeImage} />
				<div className="episode-info">
					<Card title="Delete Episode" fx={() => openModal()} />
					<h3 className="episode-text">{props.episodeTitle}</h3>
					<p className="episode-text">{props.podcastName}</p>
					<p className="episode-text">{props.publishedDate}</p>
					<p className="episode-text">{secondsToHms(props.duration)}</p>

					<RoundButton
						title={"Edit Epsiode"}
						onClick={props.onClick2}
						icon={<MdIcons.MdCreate size={22} />}
					/>
					<RoundButton
						title={"Analytics"}
						onClick={props.onClick}
						icon={<MdIcons.MdInsertChart size={22} />}
					/>
					<RoundButton
						title={"Player"}
						onClick={props.onClick4}
						icon={<MdIcons.MdAudiotrack size={22} />}
					/>
				</div>
			</div>

			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
			>
				<h3 ref={(_subtitle) => (subtitle = _subtitle)}>
					Are you sure you want to delete?
				</h3>
				<div>I am a modal</div>
				<form style={{ float: "right" }}>
					<button className="modal-button" onClick={closeModal}>
						No
					</button>
					<button className="modal-button" onClick={props.deleteEpisode}>
						Yes
					</button>
				</form>
			</Modal>
		</div>
	);
}

export default EpisodeContainer;
