import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// support icons

import patreon from 'super-tiny-icons/images/svg/patreon.svg';
import square from 'super-tiny-icons/images/svg/square_cash.svg';
import bitcoin from 'super-tiny-icons/images/svg/bitcoin.svg';
import Navbar from './Navbar';
import LinkContainer from '../../components/LinkContainer/LinkContainer';

// https://github.com/edent/SuperTinyIcons

function LandingPageSupport() {
  const [podcastData, setPodcastData] = useState('');
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
      <Navbar id={id} />
      <div style={{ margin: '0 auto', textAlign: 'center' }}>
        <img
          className="landing-page-podcast-cover"
          src={podcastData.cover_artwork}
        />
        <h2 style={{ color: '#fff', marginTop: '10px' }}>
          {podcastData.podcast_title}
        </h2>

        <div>
          {websiteData.patreon ? (
            <LinkContainer
              href={websiteData.patreon}
              linkImage={patreon}
              title="Patreon"
            />
          ) : null}
          {websiteData.cashapp ? (
            <LinkContainer
              href={websiteData.cashapp}
              linkImage={square}
              title="Cash App"
            />
          ) : null}
          {websiteData.bitcoinwallet ? (
            <LinkContainer
              href={websiteData.bitcoinwallet}
              linkImage={bitcoin}
              title="Bitcoin Wallet"
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default LandingPageSupport;
