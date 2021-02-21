import React from 'react';
import './LinkContainer.css';

// https://codepen.io/drehimself/full/BYBwBp/

function LinkContainer(props) {
  return (
    <a
      href={props.href}
      style={{ textDecoration: 'none' }}
      className="link-container"
    >
      <img className="link-image" src={props.linkImage} />
      <h2 className="link-title">{props.title}</h2>
    </a>
  );
}

export default LinkContainer;
