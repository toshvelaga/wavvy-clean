import React, { useState } from "react";
import "./TagsInput.css";

// Tags doc: https://codepen.io/prvnbist/pen/jJzROe?editors=0110

const TagsInput = (props) => {
  const [tags, setTags] = useState(props.tags);

  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const addTags = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      props.selectedTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  return (
    <>
      <div className="tags-input-container">
        <label
          style={{ display: "block", color: "#fff" }}
          className="label"
          htmlFor="fname"
        >
          {props.label}
        </label>
        <input
          type="text"
          onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
          placeholder={props.placeholder}
        />
        <ul id="tags">
          {tags.map((tag, index) => (
            <li key={index} className="tag">
              <span className="tag-title">{tag}</span>
              <span
                className="tag-close-icon"
                onClick={() => removeTags(index)}
              >
                x
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TagsInput;
