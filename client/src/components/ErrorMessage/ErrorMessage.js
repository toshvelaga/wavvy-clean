import React from "react";
import "./ErrorMessage.css";

function ErrorMessage(props) {
	return (
		<div className="error-message">
			<p>{props.errorMsg}</p>
		</div>
	);
}

export default ErrorMessage;
