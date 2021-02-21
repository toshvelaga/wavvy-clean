import React from "react";
import "./Textarea.css";

function Textarea(props) {
  return (
    <>
      <div className="textarea-container">
        <label style={{ color: "#fff" }}>{props.label}</label>
        <textarea
          value={props.value}
          onChange={props.onChange}
          style={{
            width: "100%",
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
