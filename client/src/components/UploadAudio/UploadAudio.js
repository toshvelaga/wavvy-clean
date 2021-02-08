import React from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import { connect } from "react-redux";
import {
	getAudio,
	getAudioDuration,
	getAudioLength,
	getAudioType,
} from "../../store/actions/actions";
import "./UploadAudio.css";

// react file upload progress: https://www.npmjs.com/package/react-fileupload-progress

// dropzone examples: https://react-dropzone-uploader.js.org/docs/examples

const UploadAudio = (props) => {
	// specify upload params and url for your files
	const getUploadParams = ({ file, meta }) => {
		sendAudioToAWS(file).then((Location) => props.getAudioFile(Location));
		return { url: "https://httpbin.org/post" };
	};

	const sendAudioToAWS = (file) => {
		const formData = new FormData();
		formData.append("audio", file);

		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};

		const promise = axios.post("/upload-audio", formData, config);

		const dataPromise = promise.then((response) => response.data.Location);

		return dataPromise;
	};

	// called every time a file's `status` changes
	const handleChangeStatus = ({ meta, file }, status) => {
		console.log(status, meta, file);

		// console.log(meta.duration);
		props.getAudioFileDuration(meta.duration);
		props.getAudioLength(meta.size);
		console.log(meta.type);
		props.getAudioType(meta.type);
	};

	// receives array of files that are done uploading when submit button is clicked
	const handleSubmit = (files, allFiles) => {
		console.log(files.map((f) => f.meta));
		allFiles.forEach((f) => f.remove());
	};

	return (
		<>
			<div className="upload-audio-container">
				<label style={{ color: "black" }} className="label" for="fname">
					Upload Audio File
				</label>
				<Dropzone
					// PreviewComponent={Preview}
					inputContent={"Drag Audio File or Click to Browse"}
					maxFiles={1}
					multiple={false}
					SubmitButtonComponent={null}
					getUploadParams={getUploadParams}
					onChangeStatus={handleChangeStatus}
					onSubmit={handleSubmit}
					accept="audio/*,video/*"
				/>
			</div>
		</>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		// dispatching plain actions
		getAudioFile: (uri) => dispatch(getAudio(uri)),
		getAudioFileDuration: (duration) => dispatch(getAudioDuration(duration)),
		getAudioLength: (length) => dispatch(getAudioLength(length)),
		getAudioType: (audiotype) => dispatch(getAudioType(audiotype)),
	};
};

export default connect(null, mapDispatchToProps)(UploadAudio);
