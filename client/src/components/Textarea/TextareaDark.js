import React from 'react';
import './Textarea.css';

function Textarea(props) {
  return (
    <>
      <label>{props.label}</label>
      <textarea
        className="textarea-dark"
        value={props.value}
        onChange={props.onChange}
        style={{
				  width: '100%',
				  marginTop: '.5rem',
				  resize: 'none',
				  border: 'none',
				  color: '#535353',
				  backgroundColor: '#1b1b1b',
        }}
        ref={props.ref}
        rows={props.rows}
        cols="50"
      />
    </>
  );
}

export default Textarea;
