import React, { useState, useEffect } from "react";
import "./CreatePodcasts.css";
import axios from "axios";
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
import Textarea from "../../components/Textarea/Textarea";
import store from "../../store/store";
import Navbar from "../../components/Navbar/Navbar";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function CreatePodcasts(props) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [artwork, setArtwork] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [copyright, setCopyright] = useState("");
  const [hostname, setHostname] = useState("");
  const [author, setAuthor] = useState("");
  const [explicit, setExplicit] = useState(false);
  const [file, setFile] = useState("");

  const [errorMsgPodcastTitle, seterrorMsgPodcastTitle] = useState("");
  const [errorMsgDescription, seterrorMsgDescription] = useState("");
  const [errorMsgImage, seterrorMsgImage] = useState("");
  const [errorMsgLanguage, seterrorMsgLanguage] = useState("");
  const [errorMsgCategory, seterrorMsgCategory] = useState("");

  const headers = { jwt_token: localStorage.token };

  store.subscribe(() => {
    // When state will be updated(in our case, when items will be fetched),
    // we will update local component state and force component to rerender
    // with new data.

    setFile(store.getState().imageReducer.image);
  });

  const sendImageToAWS = () => {
    const formData = new FormData();
    formData.append("image", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const promise = axios.post("/upload-cover-art", formData, config);

    const dataPromise = promise.then((response) => response.data.Location);

    return dataPromise;
  };

  const sendDataToDB = (Location) => {
    const data = {
      podcast_title: title,
      podcast_subtitle: subtitle,
      podcast_description: description,
      language,
      podcast_category: category,
      cover_artwork: Location,
      website,
      copyright,
      host_name: hostname,
      contact_email: email,
      author,
      podcast_explicit_content: explicit,
    };
    return axios
      .post("/api/post/podcasts", data, { headers })
      .then((response) => console.log(response))
      .catch((err) => console.log(err))
      .then(() => props.history.push("/podcasts"));
  };

  // const createErrorMsgs = (err) => {
  // 	seterrorMsgPodcastTitle(err.response.data.podcastTitle);
  // 	seterrorMsgImage(err.response.data.image);
  // };

  const submit = () => {
    // CHNAGE IF ELSE STATEMNTS TO SWITCH
    if (file == "") {
      seterrorMsgImage("Uploading an image is required to create a podcast");
    }

    if (file !== "") {
      seterrorMsgImage("");
    }

    if (title == "") {
      seterrorMsgPodcastTitle("Please enter a podcast title");
    }

    if (title !== "") {
      seterrorMsgPodcastTitle("");
    }

    if (description == "") {
      seterrorMsgDescription("Please do not leave podcast description empty");
    }

    if (description !== "") {
      seterrorMsgDescription("");
    }

    if (language == "") {
      seterrorMsgLanguage("Please do not leave language empty");
    }

    if (language !== "") {
      seterrorMsgLanguage("");
    }

    if (category == "") {
      seterrorMsgCategory("Please do not leave category empty");
    }

    if (category !== "") {
      seterrorMsgCategory("");
    }

    if (
      file !== "" &&
      title !== "" &&
      description !== "" &&
      language !== "" &&
      category !== ""
    ) {
      sendImageToAWS().then((Location) => sendDataToDB(Location));
    }
  };

  return (
    <>
      <div style={{ paddingBottom: "5rem" }}>
        <Navbar />
      </div>
      <div className="create-podcast-container">
        <div
          style={{
            marginBottom: "1rem",
            paddingTop: "0rem",
          }}
        >
          <h1 style={{ color: "#fff" }}>Create Podcast</h1>
        </div>
        <div className="edit-child">
          <TextInputLabel
            color="#fff"
            label="Podcast Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errorMsgPodcastTitle ? (
            <ErrorMessage errorMsg={errorMsgPodcastTitle} />
          ) : null}
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
          label="Description (4000 character limit)"
          rows={4}
        />
        {errorMsgDescription ? (
          <ErrorMessage errorMsg={errorMsgDescription} />
        ) : null}
        <div className="create-podcast-selected-container">
          <Selected
            color="#fff"
            onChange={(e) => setLanguage(e)}
            value={LANGUAGES.value}
            options={LANGUAGES}
            label="Language"
          />
          {errorMsgLanguage ? (
            <ErrorMessage errorMsg={errorMsgLanguage} />
          ) : null}
        </div>
        <div className="create-podcast-selected-container">
          <Selected
            color="#fff"
            onChange={(e) => setCategory(e)}
            value={category}
            options={CATEGORIES}
            label="iTunes Category"
          />
          {errorMsgCategory ? (
            <ErrorMessage errorMsg={errorMsgCategory} />
          ) : null}
        </div>

        <ImageUpload label="Cover Artwork" />
        {errorMsgImage ? <ErrorMessage errorMsg={errorMsgImage} /> : null}

        <div className="edit-child">
          <TextInputLabel
            color="#fff"
            label="Website (Optional)"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className="edit-child">
          <TextInputLabel
            color="#fff"
            label="Copyright (Optional)"
            placeholder="© 2020"
            value={copyright}
            onChange={(e) => setCopyright(e.target.value)}
          />
        </div>
        <div className="edit-child">
          <TextInputLabel
            color="#fff"
            label="Host Name (Optional)"
            // placeholder="Episode Title Here..."
            value={hostname}
            onChange={(e) => setHostname(e.target.value)}
          />
        </div>
        <div className="edit-child">
          <TextInputLabel
            color="#fff"
            label="Email Address (Optional)"
            // placeholder="Episode Title Here..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="edit-child">
          <TextInputLabel
            color="#fff"
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
          <div
            className="primary-button-container"
            style={{ width: "80%", margin: "0 auto" }}
          >
            <PrimaryButton
              style={{ width: "100%" }}
              fx={submit}
              title="Submit"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePodcasts;
