import React from 'react';
import './Textarea.css';

function Textarea(props) {
  return (
    <>
      <div className="textarea-container">
        <label>{props.label}</label>
        <textarea
          value={props.value}
          onChange={props.onChange}
          style={{
					  width: '100%',
					  // marginTop: ".5rem",
					  backgroundColor: props.backgroundColor,
          }}
          rows={props.rows}
          cols="50"
        />
      </div>
    </>
  );
}

export default Textarea;
