import React, { useState, useEffect } from 'react';
import EpisodeContainer from '../../components/EpisodeContainer/EpisodeContainer';
import './Episodes.css';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import Modal from 'react-modal';
import SelectedEpisode from '../../components/Selected/SelectedEpisode';
import { useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

Modal.setAppElement('#root');

function Episodes(props) {
  const [episodes, setEpisodes] = useState([]);
  const [options, setOptions] = useState([]);

  const headers = { jwt_token: localStorage.token };

  const { id } = useParams();
  const { addToast } = useToasts();

  useEffect(() => {
    if (window.location.pathname == '/episodes') {
      axios
        .get('/api/get/episodes', { headers })
        .then((res) => setEpisodes(res.data));
    } else {
      axios
        .get(`/api/get/podcast/${id}/episodes`, { headers })
        .then((res) => setEpisodes(res.data));
    }
  }, []);

  useEffect(() => {
    axios
      .get('/api/get/podcasts/options', { headers })
      .then((res) => setOptions(res.data));
  }, []);

  const deleteEpisode = (eid) => {
    axios.delete(`api/delete/episodes/${eid}`, { headers });
  };

  const onChangeHandler = (result) => {
    axios
      .get(`/api/get/podcast/${result.value}/episodes`, { headers })
      .then((res) => setEpisodes(res.data));
  };

  const createEpisodeHandler = () => {
    if (!options.length) {
      addToast('Please create a podcast first before adding episodes :)', {
        appearance: 'warning',
      });
    } else {
      props.history.push('/episodes/create');
    }
  };

  let result;

  {
    !options.length
      ? (result = [])
      : (result = options.map((opt) => ({
        value: opt.pid,
        label: opt.podcast_title,
      })));
  }

  return (
    <>
      <Navbar />
      <div className="episodes-list">
        <div style={{ textAlign: 'center', paddingTop: '5rem' }}>
          <PrimaryButton fx={createEpisodeHandler} title="Create new Episode" />
        </div>
        <div style={{ marginTop: '1rem' }}>
          {options.length ? (
            <SelectedEpisode
              onChange={(result) => onChangeHandler(result)}
              options={result}
            />
          ) : null}
        </div>

        <div>
          {!Array.isArray(episodes) || !episodes.length
            ? null
            : episodes.map((episode) => (
              <EpisodeContainer
                onClick={() => props.history.push(`/analytics/${episode.eid}`)}
                onClick2={() => props.history.push(`/episodes/${episode.eid}/edit`)}
                deleteEpisode={() => deleteEpisode(episode.eid)}
                onClick4={() => props.history.push(`/episodes/${episode.eid}/audio`)}
                episodeImage={episode.episode_artwork}
                episodeTitle={episode.episode_title}
                podcastName={episode.podcast_title}
                publishedDate={episode.episode_date_created}
                duration={episode.audio_duration}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default Episodes;
