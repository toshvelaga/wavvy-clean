import React from 'react';
import './RoundButton.css';

function RoundButton(props) {
  return (
    <>
      <button
        title={props.title}
        style={props.style}
        onClick={props.onClick}
        className="round-button"
      >
        {props.icon}
      </button>
    </>
  );
}

export default RoundButton;
