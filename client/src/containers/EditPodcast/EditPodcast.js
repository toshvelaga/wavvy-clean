import React, { useState, useEffect } from "react";
import "./EditPodcast.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import TextInputLabel from "../../components/TextInputLabel/TextInputLabel";
import Selected from "../../components/Selected/Selected";
import Checkbox from "../../components/Checkbox/Checkbox";
import {
  LANGUAGES,
  PODCAST_TYPES,
  CATEGORIES,
} from "../../constants/constants";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import EditImage from "../../components/EditImage/EditImage";
import Textarea from "../../components/Textarea/Textarea";
import { getImage } from "../../store/actions/actions";
import Navbar from "../../components/Navbar/Navbar";
import theme from "../../styles/theme.style";

function PodcastSettings(props) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [copyright, setCopyright] = useState("");
  const [hostname, setHostname] = useState("");
  const [author, setAuthor] = useState("");
  const [explicit, setExplicit] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const { id } = useParams();

  const headers = { jwt_token: localStorage.token };

  useEffect(() => {
    axios.get(`/api/get/podcasts/settings/${id}`, { headers }).then((res) => {
      setTitle(res.data.podcast_title);
      setSubtitle(res.data.podcast_subtitle);
      setDescription(res.data.podcast_description);
      setLanguage(res.data.language);
      setCategory(res.data.podcast_category);
      setImagePreviewUrl(res.data.cover_artwork);
      setWebsite(res.data.website);
      setCopyright(res.data.copyright);
      setHostname(res.data.host_name);
      setEmail(res.data.contact_email);
      setAuthor(res.data.author);
      setExplicit(res.data.podcast_explicit_content);
      console.log(res.data);
    });
  }, [id]);

  const handleSubmit = () => {
    const data = {
      podcast_title: title,
      podcast_subtitle: subtitle,
      podcast_description: description,
      language,
      podcast_category: category,
      cover_artwork: imagePreviewUrl,
      website,
      copyright,
      host_name: hostname,
      contact_email: email,
      author,
      podcast_explicit_content: explicit,
    };

    axios
      .put(`/api/update/podcast/settings/${id}`, data, { headers })
      .then((response) => console.log(response))
      .then(() => props.history.push("/podcasts"))
      .catch((err) => console.log(err));
  };

  const _handleImageChange = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
      console.log(file);
      props.getImageFile(file);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <div style={{ paddingBottom: "5rem" }}>
        <Navbar />
      </div>
      <div className="edit-podcast-container">
        <div
          style={{
            marginBottom: "1rem",
            paddingTop: "0rem",
          }}
        >
          <h1 style={{ color: theme.TEXT_COLOR_WHITE }}>Edit Podcast</h1>
        </div>
        <div className="edit-child">
          <TextInputLabel
            color={theme.TEXT_COLOR_WHITE}
            label="Podcast Title"
            // placeholder="Episode Title Here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <Textarea
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          label="Subtitle (Optional)"
          rows={3}
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          rows={4}
        />
        <div className="edit-podcast-selected-container">
          <Selected
            color={theme.TEXT_COLOR_WHITE}
            onChange={(e) => setLanguage(e)}
            value={language}
            options={LANGUAGES}
            label="Language"
          />
        </div>
        <div className="edit-podcast-selected-container">
          <Selected
            color={theme.TEXT_COLOR_WHITE}
            onChange={(e) => setCategory(e)}
            value={category}
            options={CATEGORIES}
            label="iTunes Category"
          />
        </div>
        {/* <ImageUpload label="Cover Artwork" /> */}
        <EditImage
          label="Cover Artwork"
          imagePreviewUrl={imagePreviewUrl}
          onChange={_handleImageChange}
        />
        <div className="edit-child">
          <TextInputLabel
            color={theme.TEXT_COLOR_WHITE}
            label="Website (Optional)"
            // placeholder="Episode Title Here..."
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className="edit-child">
          <TextInputLabel
            color={theme.TEXT_COLOR_WHITE}
            label="Copyright (Optional)"
            placeholder="© 2020"
            value={copyright}
            onChange={(e) => setCopyright(e.target.value)}
          />
        </div>

        <div className="edit-child">
          <TextInputLabel
            color={theme.TEXT_COLOR_WHITE}
            label="Host Name (Optional)"
            // placeholder="Episode Title Here..."
            value={hostname}
            onChange={(e) => setHostname(e.target.value)}
          />
        </div>
        <div className="edit-child">
          <TextInputLabel
            color={theme.TEXT_COLOR_WHITE}
            label="Email Address (Optional)"
            // placeholder="Episode Title Here..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="edit-child">
          <TextInputLabel
            color={theme.TEXT_COLOR_WHITE}
            label="Author (Optional)"
            // placeholder="Episode Title Here..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="edit-child">
          <Checkbox
            onChange={() => setExplicit(!explicit)}
            value={explicit}
            checked={explicit}
          />
        </div>
        <div className="bottom">
          <div>
            <PrimaryButton fx={handleSubmit} title="Submit" />
          </div>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  // dispatching plain actions
  getImageFile: (uri) => dispatch(getImage(uri)),
});

export default connect(null, mapDispatchToProps)(PodcastSettings);
