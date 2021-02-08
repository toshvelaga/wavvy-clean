import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import LinkContainer from "../../components/LinkContainer/LinkContainer";
import Navbar from "./Navbar";

// podcast icons

import iTunes from "super-tiny-icons/images/svg/itunes_podcasts.svg";
import googlePodcasts from "super-tiny-icons/images/svg/google_podcasts.svg";
import overcast from "super-tiny-icons/images/svg/overcast.svg";
import spotify from "super-tiny-icons/images/svg/spotify.svg";
import stitcher from "super-tiny-icons/images/svg/stitcher.svg";
import rss from "super-tiny-icons/images/svg/rss.svg";

// social media icons

import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

// support icons

import patreon from "super-tiny-icons/images/svg/patreon.svg";
import square from "super-tiny-icons/images/svg/square_cash.svg";
import bitcoin from "super-tiny-icons/images/svg/bitcoin.svg";

// https://github.com/edent/SuperTinyIcons

function LandingPage() {
	const [podcastData, setPodcastData] = useState("");
	const [websiteData, setwebsiteData] = useState([]);

	const { id } = useParams();

	useEffect(() => {
		axios
			.get(`/api/get/podcast/public-site/${id}`)
			.then((res) => setPodcastData(res.data));
	}, []);

	useEffect(() => {
		axios
			.get(`/api/get/website/links/${id}`)
			.then((res) => setwebsiteData(res.data));
	}, []);

	return (
		<>
			<body id="landing-page-body">
				{/* <Navbar id={id} /> */}
				<div style={{ margin: "0 auto", textAlign: "center" }}>
					<img
						className="landing-page-podcast-cover"
						src={podcastData.cover_artwork}
					/>
					<h2
						style={{ color: "#fff", marginTop: "10px", marginBottom: "1rem" }}
					>
						{podcastData.podcast_title}
					</h2>

					{websiteData.instagram ? (
						<span style={{ margin: "0 .5rem" }}>
							<a href={websiteData.instagram}>
								<FaIcons.FaInstagram color={"#fff"} size={32} />
							</a>
						</span>
					) : null}

					{websiteData.twitter ? (
						<span style={{ margin: "0 .5rem" }}>
							<a href={websiteData.twitter}>
								<FaIcons.FaTwitter color={"#fff"} size={32} />
							</a>
						</span>
					) : null}

					{websiteData.facebook ? (
						<span style={{ margin: "0 .5rem" }}>
							<a href={websiteData.facebook}>
								<FaIcons.FaFacebook color={"#fff"} size={32} />
							</a>
						</span>
					) : null}

					{websiteData.youtube ? (
						<span style={{ margin: "0 .5rem" }}>
							<a href={websiteData.youtube}>
								<FaIcons.FaYoutube color={"#fff"} size={32} />
							</a>
						</span>
					) : null}

					{websiteData.tiktok ? (
						<span style={{ margin: "0 .5rem" }}>
							<a href={websiteData.tiktok}>
								<SiIcons.SiTiktok color={"#fff"} size={30} />
							</a>
						</span>
					) : null}

					<br></br>

					{websiteData.rssfeed ? (
						<LinkContainer
							href={websiteData.rssfeed}
							linkImage={rss}
							title={"RSS Feed"}
						/>
					) : null}
					{websiteData.itunes ? (
						<LinkContainer
							href={websiteData.itunes}
							linkImage={iTunes}
							title={"iTunes"}
						/>
					) : null}
					{websiteData.spotify ? (
						<LinkContainer
							href={websiteData.spotify}
							linkImage={spotify}
							title={"Spotify"}
						/>
					) : null}
					{websiteData.googlepodcasts ? (
						<LinkContainer
							href={websiteData.googlepodcasts}
							linkImage={googlePodcasts}
							title={"Google Podcasts"}
						/>
					) : null}
					{websiteData.stitcher ? (
						<LinkContainer
							href={websiteData.stitcher}
							linkImage={stitcher}
							title={"Stitcher"}
						/>
					) : null}
					{websiteData.overcast ? (
						<LinkContainer
							href={websiteData.overcast}
							linkImage={overcast}
							title={"Overcast"}
						/>
					) : null}

					{websiteData.patreon ? (
						<LinkContainer
							href={websiteData.patreon}
							linkImage={patreon}
							title={"Patreon"}
						/>
					) : null}
					{websiteData.cashapp ? (
						<LinkContainer
							href={websiteData.cashapp}
							linkImage={square}
							title={"Cash App"}
						/>
					) : null}
					{websiteData.bitcoinwallet ? (
						<LinkContainer
							href={websiteData.bitcoinwallet}
							linkImage={bitcoin}
							title={"Bitcoin Wallet"}
						/>
					) : null}

					<br></br>
					<br></br>

					<br></br>

					<br></br>
					<div></div>
				</div>
			</body>
		</>
	);
}

export default LandingPage;
