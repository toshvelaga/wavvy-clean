import React from "react";
import "./TextInputLabel.css";

function TextInputLabel(props) {
	return (
		<>
			<div className="text-input-container">
				<label style={{ color: props.color }} className="label" for="fname">
					{props.label}
				</label>
				<input
					type="text"
					id={props.id}
					name={props.name}
					placeholder={props.placeholder}
					style={props.style}
					value={props.value}
					onChange={props.onChange}
					required={props.required}
				></input>
			</div>
		</>
	);
}

export default TextInputLabel;
