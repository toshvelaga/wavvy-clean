import React, { Component } from "react";
import Select from "react-select";
import "./Selected.css";

// react-select: https://www.npmjs.com/package/react-select

function Selected(props) {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#242424",
      // match with the menu
      // borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // // Overwrittes the different states of border
      borderColor: state.isFocused ? "black" : "transparent",
    }),
    menu: (base) => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
    }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      color: "#ffffff",
      // color: "#333333",
    }),
  };
  return (
    <>
      <div className="selected-container">
        <label
          style={{ display: "block", marginBottom: "8px", color: props.color }}
          className="label"
        >
          {props.label}
        </label>
        <Select
          styles={customStyles}
          value={props.value}
          onChange={props.onChange}
          options={props.options}
          // defaultValue={props.defaultValue}
          // defaultInputValue={props.defaultInputValue}
          theme={(theme) => ({
            ...theme,
            border: "1px solid black",
            // borderRadius: 0,
            colors: {
              ...theme.colors,
              // primary25: "hotpink",
              // primary: "#121212",
            },
          })}
        />
      </div>
    </>
  );
}

export default Selected;
