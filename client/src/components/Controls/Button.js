import React from 'react';
import './button.css';
import * as MdIcons from 'react-icons/md';

function Button({ play, isPlaying }) {
  return (
    <>
      <span style={{ marginLeft: 0 }} className="btn-container" onClick={play}>
        {isPlaying ? (
          <MdIcons.MdPauseCircleFilled color="#535353" size={65} />
        ) : (
          <MdIcons.MdPlayCircleFilled color="#535353" size={65} />
        )}
      </span>
    </>
  );
}
export default Button;
