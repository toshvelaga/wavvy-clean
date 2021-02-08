import React, { Component } from "react";
import "./EditImage.css";

// doc: https://hartzis.me/react-image-upload/
// codepen: https://codepen.io/hartzis/pen/VvNGZP

class EditImage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let imagePreviewUrl = this.props.imagePreviewUrl;
		let $imagePreview = null;
		if (imagePreviewUrl) {
			$imagePreview = <img src={this.props.imagePreviewUrl} />;
		} else {
			$imagePreview = (
				<div className="previewText">Select an Image for Preview</div>
			);
		}

		return (
			<>
				<div className="previewComponent">
					<label
						style={{ display: "block", color: "black" }}
						className="label"
						for="fname"
					>
						{this.props.label}
					</label>
					<input
						className="fileInput"
						type="file"
						accept="image/png, image/jpg"
						onChange={this.props.onChange}
					/>
					<div className="imgPreview">{$imagePreview}</div>
				</div>
			</>
		);
	}
}

export default EditImage;
