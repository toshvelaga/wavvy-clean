import React from "react";
import theme from "../../styles/theme.style";
import "./PrimaryButton.css";

function PrimaryButton(props) {
	return (
		<>
			<button style={props.style} className="button" onClick={props.fx}>
				{props.title}
			</button>
		</>
	);
}

export default PrimaryButton;
