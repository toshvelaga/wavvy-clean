import React from "react";
import "./AlbumImage.css";

function AlbumImage(props) {
	return (
		<>
			<img className="AlbumImage" src={props.src} />
		</>
	);
}

export default AlbumImage;
