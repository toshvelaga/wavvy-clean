import React, { Component } from "react";
import Select from "react-select";

// react-select: https://www.npmjs.com/package/react-select
// style: https://stackoverflow.com/questions/59591251/change-color-arrow-icon-react-select
// more styling: https://codesandbox.io/s/admiring-wind-ycmjr?file=/src/index.js

function SelectedEpisode(props) {
	const customStyles = {
		control: (base, state) => ({
			...base,
			background: "#1b1b1b",
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
		placeholder: (defaultStyles) => {
			return {
				...defaultStyles,
				color: "#ffffff",
				// color: "#333333",
			};
		},
	};

	return (
		<>
			{/* <label
				style={{ display: "block", marginBottom: "8px", color: props.color }}
				className="label"
			>
				{props.label}
			</label> */}
			<Select
				styles={customStyles}
				value={props.value}
				onChange={props.onChange}
				options={props.options}
				placeholder="Select by podcast name..."
				// defaultValue={props.defaultValue}
				// defaultInputValue={props.defaultInputValue}
				theme={(theme) => ({
					...theme,
					// borderRadius: 0,
					colors: {
						...theme.colors,
						// primary25: "hotpink",
						// primary: "#08c803",
					},
				})}
			/>
		</>
	);
}

export default SelectedEpisode;
