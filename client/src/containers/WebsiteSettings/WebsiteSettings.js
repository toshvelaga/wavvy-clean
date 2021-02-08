import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./WebsiteSettings.css";
import WebsiteContainer from "../../components/WebsiteContainer/WebsiteContainer";
import axios from "axios";

function WebsiteSettings(props) {
	const [podcasts, setPodcasts] = useState([]);

	const headers = { jwt_token: localStorage.token };

	useEffect(() => {
		axios
			.get("/api/get/podcasts", { headers })
			.then((res) => setPodcasts(res.data));
	}, []);

	return (
		<>
			<Navbar />
			<br></br>
			<br></br>
			<br></br>
			<h1 style={{ paddingBottom: "2rem" }}></h1>
			<div className="website-settings">
				{podcasts.map((podcast) => (
					<WebsiteContainer
						fx1={() => props.history.push(`/edit/${podcast.pid}`)}
						fx2={() => props.history.push(`/${podcast.pid}`)}
						coverImage={podcast.cover_artwork}
						podcastName={podcast.podcast_title}
						podcastDesc={
							podcast.podcast_description.length > 150
								? `${podcast.podcast_description.substring(0, 150)}...`
								: podcast.podcast_description
						}
					/>
				))}
			</div>
		</>
	);
}

export default WebsiteSettings;
