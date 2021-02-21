import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// social media icons

import instagram from 'super-tiny-icons/images/svg/instagram.svg';
import facebook from 'super-tiny-icons/images/svg/facebook.svg';
import twitter from 'super-tiny-icons/images/svg/twitter.svg';
import youtube from 'super-tiny-icons/images/svg/youtube.svg';
import tiktok from 'super-tiny-icons/images/svg/tiktok.svg';
import Navbar from './Navbar';
import LinkContainer from '../../components/LinkContainer/LinkContainer';

// https://github.com/edent/SuperTinyIcons

function LandingPageSocial() {
  const [podcastData, setPodcastData] = useState([]);
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
        <br />
        {websiteData.instagram ? (
          <LinkContainer
            href={websiteData.instagram}
            linkImage={instagram}
            title="Instagram"
          />
        ) : null}
        {websiteData.facebook ? (
          <LinkContainer
            href={websiteData.facebook}
            linkImage={facebook}
            title="Facebook"
          />
        ) : null}
        {websiteData.twitter ? (
          <LinkContainer
            href={websiteData.twitter}
            linkImage={twitter}
            title="Twitter"
          />
        ) : null}
        {websiteData.youtube ? (
          <LinkContainer
            href={websiteData.youtube}
            linkImage={youtube}
            title="Youtube"
          />
        ) : null}
        {websiteData.tiktok ? (
          <LinkContainer
            href={websiteData.tiktok}
            linkImage={tiktok}
            title="TikTok"
          />
        ) : null}
      </div>
    </>
  );
}

export default LandingPageSocial;
