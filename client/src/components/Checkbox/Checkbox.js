import React from 'react';
import './Checkbox.css';

// checkbox docs: https://codepen.io/avstorm/pen/vYYBxRM

function Checkbox(props) {
  return (
    <>
      <div className="checkbox-container">
        <input
          className="inp-cbx"
          id="cbx"
          type="checkbox"
          style={{ display: 'none' }}
          onChange={props.onChange}
          checked={props.checked}
        />
        <label className="cbx" htmlFor="cbx">
          <span style={{ margin: 0 }}>
            <svg width="12px" height="9px" viewbox="0 0 12 9">
              <polyline points="1 5 4 8 11 1" />
            </svg>
          </span>
          <span>This episode contains explicit material.</span>
        </label>
      </div>
    </>
  );
}

export default Checkbox;
