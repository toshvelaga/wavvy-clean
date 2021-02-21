import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Analytics.css';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const Analytics = () => {
  const [episodeData, setEpisodeData] = useState([]);

  const headers = { jwt_token: localStorage.token };

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/get/episodes/${id}`, { headers })
      .then((res) => setEpisodeData(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="analytics-container">
        <h1 style={{ color: '#fff', paddingTop: '5rem' }}>Analytics</h1>
        <br />
        <div className="analytics-container-div">
          Total Plays:
          {' '}
          {episodeData.episode_audio_plays}
        </div>
        <br />
        <div className="analytics-container-div">
          Total Plays to Completion:
          {' '}
          {episodeData.episode_audio_plays_completed}
        </div>
      </div>
    </>
  );
};

export default Analytics;
