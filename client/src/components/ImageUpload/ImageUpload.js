import React, { Component, useState } from "react";
import "./ImageUpload.css";
import { connect } from "react-redux";
import { getImage } from "../../store/actions/actions";

// doc: https://hartzis.me/react-image-upload/
// codepen: https://codepen.io/hartzis/pen/VvNGZP

// STYLE FILE INPUT BUTTON: https://masakudamatsu.medium.com/how-to-customize-the-file-upload-button-in-react-b3866a5973d8

function ImageUpload(props) {
	const [imagePreviewUrl, setimagePreviewUrl] = useState("");

	const _handleImageChange = (e) => {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			setimagePreviewUrl(reader.result);
			console.log(file);
			console.log(file.name);
			props.getImageFile(file);
		};

		reader.readAsDataURL(file);
	};

	let $imagePreview = null;
	if (imagePreviewUrl) {
		$imagePreview = <img src={imagePreviewUrl} />;
	} else {
		$imagePreview = <div className="previewText">Select Image to Preview</div>;
	}

	return (
		<>
			<div className="previewComponent">
				<label
					style={{ display: "block", color: "black" }}
					className="label"
					for="fname"
				>
					{props.label}
				</label>
				<input
					style={{ border: "none" }}
					className="fileInput"
					type="file"
					name="image"
					accept="image/png, image/jpg"
					onChange={(e) => _handleImageChange(e)}
				/>
				<div className="imgPreview">{$imagePreview}</div>
			</div>
		</>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		// dispatching plain actions
		getImageFile: (uri) => dispatch(getImage(uri)),
	};
};

export default connect(null, mapDispatchToProps)(ImageUpload);
