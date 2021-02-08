import React, { useState, useEffect, useRef } from "react";
import "./AudioWidget.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "../../components/Slider/Slider";
import ControlPanel from "../../components/Controls/ControlPanel";
import * as BsIcons from "react-icons/bs";
import Button from "../../components/Controls/Button";

function AudioWidget() {
	const [episodeData, setEpisodeData] = useState([]);
	const [percentage, setPercentage] = useState();
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState();
	const [speed, setSpeed] = useState(1);
	const [counted, setCounted] = useState(false);

	const audioRef = useRef();

	const { id } = useParams();

	const onChange = (e) => {
		const audio = audioRef.current;
		audio.currentTime = (audio.duration / 100) * e.target.value;
		setPercentage(e.target.value);
	};

	const play = () => {
		const audio = audioRef.current;
		// audio.playbackRate = speed;
		audio.volume = 0.1;

		if (!counted) {
			console.log("clicked");
			incListenCount();
			setCounted(true);
		}

		if (!isPlaying) {
			setIsPlaying(true);
			audio.play();
		}

		if (isPlaying) {
			setIsPlaying(false);
			audio.pause();
		}
	};

	const getCurrDuration = (e) => {
		const percent = (
			(e.currentTarget.currentTime / e.currentTarget.duration) *
			100
		).toFixed(2);

		const time = e.currentTarget.currentTime;

		setPercentage(+percent);
		setCurrentTime(time.toFixed(2));
	};

	const changeSpeed = () => {
		if (speed >= 2) {
			setSpeed(0.5);
		} else setSpeed(speed + 0.5);
	};

	const skip = (time) => {
		const audio = audioRef.current;

		if (time == "back") {
			console.log("15");
			audio.currentTime = audio.currentTime - 15;
		} else if (time == "fwd") {
			console.log("15");
			audio.currentTime = audio.currentTime + 15;
		}
	};

	const incListenCount = () => {
		axios
			.patch(`/api/update/episodes/${id}/views`)
			.then((res) => console.log(res));
	};

	const incListenCompleted = () => {
		axios
			.patch(`/api/update/episodes/${id}/views/completed`)
			.then((res) => console.log(res));
	};

	useEffect(() => {
		axios
			.get(`/api/get/episodes/public/${id}`)
			.then((res) => setEpisodeData(res.data));
	}, []);

	useEffect(() => {
		const audio = audioRef.current;
		audio.playbackRate = speed;

		audio.onended = function () {
			incListenCompleted();
		};
	}, [speed]);

	return (
		<>
			<div className="embed-audio-container">
				<img className="podcast-image" src={episodeData.episode_artwork} />
				<div className="podcast-info">
					<h3 style={{ color: "#fff", marginBottom: ".3em" }}>
						{episodeData.episode_title}
					</h3>
					<p
						style={{
							color: "#535353",
							marginBottom: ".3em",
							fontWeight: 200,
						}}
					>
						{episodeData.podcast_title}
					</p>

					<div>
						<Slider percentage={percentage} onChange={onChange} />
						<div>
							<ControlPanel
								play={play}
								isPlaying={isPlaying}
								duration={duration}
								currentTime={currentTime}
							/>
						</div>
					</div>
					<div>
						<Button play={play} isPlaying={isPlaying} />
						<button className="skip-buttons" onClick={() => skip("back")}>
							<BsIcons.BsArrowCounterclockwise color={"#535353"} size={22} />
						</button>
						<button className="speed-button" onClick={() => changeSpeed()}>
							{speed}x
						</button>
						<button className="skip-buttons" onClick={() => skip("fwd")}>
							<BsIcons.BsArrowClockwise color={"#535353"} size={22} />
						</button>
					</div>
					<audio
						ref={audioRef}
						onTimeUpdate={getCurrDuration}
						onLoadedData={(e) => {
							setDuration(e.currentTarget.duration.toFixed(2));
						}}
						src={episodeData.episode_audio}
					></audio>
				</div>
			</div>
		</>
	);
}

export default AudioWidget;
