import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Navbar from "../../components/Navbar/Navbar";
import TextInputLabel from "../../components/TextInputLabel/TextInputLabel";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import "./EditWebsite.css";
import theme from "../../styles/theme.style";

function EditWebsite() {
  const [websiteData, setwebsiteData] = useState([]);
  // SOCIAL MEDIA LINKS
  const [instagram, setinstagram] = useState("");
  const [facebook, setfacebook] = useState("");
  const [twitter, settwitter] = useState("");
  const [youtube, setyoutube] = useState("");
  const [tiktok, settiktok] = useState("");

  // SUPPORT LINKS
  const [patreon, setpatreon] = useState("");
  const [cashapp, setcashapp] = useState("");
  const [bitcoinwallet, setbitcoinwallet] = useState("");

  // SUBSCIRBE LINKS
  const [itunes, setitunes] = useState("");
  const [spotify, setspotify] = useState("");
  const [googlepodcasts, setgooglepodcasts] = useState("");
  const [rssfeed, setrssfeed] = useState("");
  const [overcast, setovercast] = useState("");
  const [stitcher, setstitcher] = useState("");

  const { id } = useParams();

  const { addToast } = useToasts();

  const headers = { jwt_token: localStorage.token };

  useEffect(() => {
    axios.get(`/api/get/website/links/${id}`, { headers }).then((res) => {
      setinstagram(res.data.instagram);
      setfacebook(res.data.facebook);
      settwitter(res.data.twitter);
      setyoutube(res.data.youtube);
      settiktok(res.data.tiktok);

      setpatreon(res.data.patreon);
      setcashapp(res.data.cashapp);
      setbitcoinwallet(res.data.bitcoinwallet);

      setitunes(res.data.itunes);
      setspotify(res.data.spotify);
      setgooglepodcasts(res.data.googlepodcasts);
      setrssfeed(res.data.rssfeed);
      setovercast(res.data.overcast);
      setstitcher(res.data.stitcher);

      console.log(res.data);
    });
  }, [id]);

  const submitSocialLink = () => {
    const data = {
      instagram,
      facebook,
      twitter,
      youtube,
      tiktok,
    };
    axios
      .put(`/api/post/website/social-media-links/${id}`, data, { headers })
      .then((response) => console.log(response))
      .then(() =>
        addToast("Social media links successfully updated.", {
          appearance: "success",
        })
      )
      .catch((err) => console.log(err));
  };

  const submitSupportLink = () => {
    const data = {
      patreon,
      cashapp,
      bitcoinwallet,
    };
    axios
      .put(`/api/post/website/support-links/${id}`, data, { headers })
      .then((response) => console.log(response))
      .then(() =>
        addToast("Support links successfully updated.", {
          appearance: "success",
        })
      )
      .catch((err) => console.log(err));
  };

  const submitSubscribeLink = () => {
    const data = {
      itunes,
      spotify,
      googlepodcasts,
      rssfeed,
      overcast,
      stitcher,
    };
    axios
      .put(`/api/post/website/subscribe-links/${id}`, data, { headers })
      .then((response) => console.log(response))
      .then(() =>
        addToast("Subscribe links successfully updated.", {
          appearance: "success",
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div style={{ paddingBottom: "5rem" }}>
        <Navbar />
      </div>
      <div style={{ marginBottom: "4rem" }} className="edit-website-container">
        <h2 style={{ color: theme.TEXT_COLOR_WHITE }}>Social Media Links</h2>
        <TextInputLabel
          onChange={(e) => setinstagram(e.target.value)}
          value={instagram}
          color={theme.TEXT_COLOR_WHITE}
          label="Instagram"
        />
        <TextInputLabel
          onChange={(e) => setfacebook(e.target.value)}
          value={facebook}
          color={theme.TEXT_COLOR_WHITE}
          label="Facebook"
        />
        <TextInputLabel
          onChange={(e) => settwitter(e.target.value)}
          value={twitter}
          color={theme.TEXT_COLOR_WHITE}
          label="Twitter"
        />
        <TextInputLabel
          onChange={(e) => setyoutube(e.target.value)}
          value={youtube}
          color={theme.TEXT_COLOR_WHITE}
          label="YouTube"
        />
        <TextInputLabel
          onChange={(e) => settiktok(e.target.value)}
          value={tiktok}
          color={theme.TEXT_COLOR_WHITE}
          label="TikTok"
        />

        <PrimaryButton fx={submitSocialLink} title="Save" />
      </div>

      <div style={{ marginBottom: "4rem" }} className="edit-website-container">
        <h2 style={{ color: theme.TEXT_COLOR_WHITE }}>Subscribe Links</h2>
        <TextInputLabel
          onChange={(e) => setitunes(e.target.value)}
          value={itunes}
          color={theme.TEXT_COLOR_WHITE}
          label="Itunes"
        />
        <TextInputLabel
          onChange={(e) => setspotify(e.target.value)}
          value={spotify}
          color={theme.TEXT_COLOR_WHITE}
          label="Spotify"
        />
        <TextInputLabel
          onChange={(e) => setgooglepodcasts(e.target.value)}
          value={googlepodcasts}
          color={theme.TEXT_COLOR_WHITE}
          label="Google Podcasts"
        />
        <TextInputLabel
          onChange={(e) => setrssfeed(e.target.value)}
          value={rssfeed}
          color={theme.TEXT_COLOR_WHITE}
          label="RSS Feed"
        />
        <TextInputLabel
          onChange={(e) => setovercast(e.target.value)}
          value={overcast}
          color={theme.TEXT_COLOR_WHITE}
          label="Overcast"
        />
        <TextInputLabel
          onChange={(e) => setstitcher(e.target.value)}
          value={stitcher}
          color={theme.TEXT_COLOR_WHITE}
          label="Stitcher"
        />
        <PrimaryButton fx={submitSubscribeLink} title="Save" />
      </div>

      <div style={{ marginBottom: "5rem" }} className="edit-website-container">
        <h2 style={{ color: theme.TEXT_COLOR_WHITE }}>Support Links</h2>
        <TextInputLabel
          onChange={(e) => setpatreon(e.target.value)}
          value={patreon}
          color={theme.TEXT_COLOR_WHITE}
          label="Patreon"
        />
        <TextInputLabel
          onChange={(e) => setcashapp(e.target.value)}
          value={cashapp}
          color={theme.TEXT_COLOR_WHITE}
          label="Cash App"
        />
        <TextInputLabel
          onChange={(e) => setbitcoinwallet(e.target.value)}
          value={bitcoinwallet}
          color={theme.TEXT_COLOR_WHITE}
          label="Bitcoin Wallet"
        />
        <PrimaryButton fx={submitSupportLink} title="Save" />
      </div>
    </>
  );
}

export default EditWebsite;
