import React, { useState, useEffect, useRef } from 'react';
import './AudioPlayer.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as RiIcons from 'react-icons/ri';
import * as GrIcons from 'react-icons/gr';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';
import AlbumImage from '../../components/AlbumImage/AlbumImage';
import ControlPanel from '../../components/Controls/ControlPanel';
import Slider from '../../components/Slider/Slider';
import Navbar from '../../components/Navbar/Navbar';
import RoundButton from '../../components/RoundButton/RoundButton';
import Button from '../../components/Controls/Button';
import Textarea from '../../components/Textarea/Textarea';
import TextareaDark from '../../components/Textarea/TextareaDark';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

// https://www.youtube.com/watch?v=AYBuL8FhgwA&ab_channel=jsua
// https://github.com/OlegSuncrown/react-audio-player/blob/master/src/App.js

function AudioPlayer(props) {
  const [episodeData, setEpisodeData] = useState([]);
  const [percentage, setPercentage] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState();
  const [speed, setSpeed] = useState(1);
  const [textareaValue, setTextareaValue] = useState('');
  const [buttonTitle, setbuttonTitle] = useState('Copy Embed Link');

  const textAreaRef = useRef(null);

  const audioRef = useRef();

  const onChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };

  const play = () => {
    const audio = audioRef.current;
    // audio.playbackRate = speed;
    audio.volume = 0.1;

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
      (e.currentTarget.currentTime / e.currentTarget.duration)
			* 100
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

    if (time == 'back') {
      console.log('15');
      audio.currentTime -= 15;
    } else if (time == 'fwd') {
      console.log('15');
      audio.currentTime += 15;
    }
  };

  const { id } = useParams();

  const headers = { jwt_token: localStorage.token };

  useEffect(() => {
    axios
      .get(`/api/get/episodes/${id}`, { headers })
      .then((res) => setEpisodeData(res.data));
  }, []);

  useEffect(() => {
    setTextareaValue(
      `<iframe src="https://www.wavvy.us/episodes/${id}/embed-audio-player" width="100%" height="200" frameBorder="0" scrolling="no"></iframe>`,
    );
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    audio.playbackRate = speed;
  }, [speed]);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '5rem' }}>
        <div className="podcast-audio-container">
          <img className="podcast-image" src={episodeData.episode_artwork} />
          <div className="podcast-info">
            <h3 style={{ color: '#fff', marginBottom: '.3em' }}>
              {episodeData.episode_title}
            </h3>
            <p
              style={{
							  color: '#535353',
							  marginBottom: '.3em',
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
              <button className="skip-buttons" onClick={() => skip('back')}>
                <BsIcons.BsArrowCounterclockwise color="#535353" size={22} />
              </button>
              <button className="speed-button" onClick={() => changeSpeed()}>
                {speed}
                x
              </button>
              <button className="skip-buttons" onClick={() => skip('fwd')}>
                <BsIcons.BsArrowClockwise color="#535353" size={22} />
              </button>
            </div>
            <audio
              ref={audioRef}
              onTimeUpdate={getCurrDuration}
              onLoadedData={(e) => {
							  setDuration(e.currentTarget.duration.toFixed(2));
              }}
              src={episodeData.episode_audio}
            />
          </div>
        </div>

        <div className="textarea-dark-container">
          <TextareaDark ref={textAreaRef} rows={3} value={textareaValue} />
        </div>
        <div className="audio-player-submit-button">
          <PrimaryButton
            style={{ width: '80%' }}
            fx={() => {
						  navigator.clipboard.writeText(textareaValue);
						  setbuttonTitle('Copied!');
            }}
            title={buttonTitle}
          />
        </div>
      </div>
    </>
  );
}

export default AudioPlayer;
