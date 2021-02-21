import React, { useState, useEffect } from "react";
import RoundButton from "../RoundButton/RoundButton";
import "./PodcastContainer.css";
import * as MdIcons from "react-icons/md";
import axios from "axios";
import Modal from "react-modal";
import Card from "../Card/Card";

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

function PodcastContainer(props) {
  const [num, setNum] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const headers = { jwt_token: localStorage.token };

  let subtitle;

  const getNumOfEpispodes = (id) => {
    const promise = axios
      .get(`/api/get/podcasts/settings/${id}/num-of-podcasts`, {
        headers,
      })
      .then((result) => {
        {
          setNum(result.data);
        }
      });
    return (
      <p style={{ color: "#fff", marginBottom: ".5em" }}>
        {num} episodes published
      </p>
    );
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h3 ref={(_subtitle) => (subtitle = _subtitle)}>
          Are you sure you want to delete?
        </h3>
        <p
          style={{
            color: "#fff",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          This will also delete all episodes associated
          <br /> with your podcast.
        </p>
        <form style={{ float: "right" }}>
          <button className="modal-button" onClick={closeModal}>
            No
          </button>
          <button className="modal-button" onClick={props.deletePodcast}>
            Yes
          </button>
        </form>
      </Modal>

      <div className="podcast-container">
        <img className="podcast-image" src={props.coverImage} />
        <div className="podcast-info">
          <Card title="Delete Podcast" fx={() => openModal()} />
          <h3
            style={{ color: "#fff", marginTop: "0rem", marginBottom: ".5em" }}
          >
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
          {getNumOfEpispodes(props.num)}
          <div>
            <RoundButton
              title="Settings"
              onClick={props.fx1}
              icon={<MdIcons.MdCreate size={22} />}
            />
            <RoundButton
              title="View Epsiodes"
              onClick={props.fx2}
              icon={<MdIcons.MdRemoveRedEye size={22} />}
            />
            <RoundButton
              title="Add Epsiodes"
              onClick={props.fx3}
              icon={<MdIcons.MdCloudUpload size={22} />}
            />
            <RoundButton
              title="View RSS"
              onClick={props.fx4}
              icon={<MdIcons.MdRssFeed size={22} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PodcastContainer;
