import React, { useEffect, useState } from 'react';
import PodcastContainer from '../../components/PodcastContainer/PodcastContainer';
import './Podcasts.css';
import axios from 'axios';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import Navbar from '../../components/Navbar/Navbar';

function Podcasts(props) {
  const [podcasts, setPodcasts] = useState([]);

  const headers = { jwt_token: localStorage.token };

  useEffect(() => {
    axios
      .get('/api/get/podcasts', { headers })
      .then((res) => setPodcasts(res.data));
  }, []);

  const deletePodcast = (id) => {
    axios.delete(`api/delete/podcasts/${id}`, { headers });
  };

  return (
    <>
      <Navbar />
      <div className="podcasts-lists">
        <div
          style={{ textAlign: 'center', marginTop: '0', paddingTop: '5rem' }}
        >
          <PrimaryButton
            fx={() => props.history.push('/podcasts/create')}
            title="Create new Podcast"
          />
        </div>
        <div>
          {podcasts.map((podcast) => (
            <PodcastContainer
              fx1={() => props.history.push(`/podcasts/settings/${podcast.pid}`)}
              fx2={() => props.history.push(`/${podcast.pid}/episodes`)}
              fx3={() => props.history.push(`podcasts/${podcast.pid}/episodes/create`)}
              fx4={() => window.open(
							    `https://www.wavvy.us/get-rss-feed/${podcast.pid}`,
							    '_blank',
							  )}
              deletePodcast={() => deletePodcast(podcast.pid)}
              coverImage={podcast.cover_artwork}
              podcastName={podcast.podcast_title}
              podcastDesc={
								podcast.podcast_description.length > 150
								  ? `${podcast.podcast_description.substring(0, 150)}...`
								  : podcast.podcast_description
							}
              num={podcast.pid}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Podcasts;
