import React from 'react';
import './FlashMessage.css';
import * as MdIcons from 'react-icons/md';

function FlashMessage(props) {
  return (
    <div className="flash-message">
      <p className="flash-error-message">
        {props.message}
        <span
          style={{
					  verticalAlign: 'bottom',
					  float: 'right',
					  marginRight: '1rem',
					  marginTop: '8px',
					  cursor: 'pointer',
          }}
        >
          <MdIcons.MdClose size={30} />
        </span>
      </p>
    </div>
  );
}

export default FlashMessage;
