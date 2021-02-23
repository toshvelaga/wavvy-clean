import React, { useState, useEffect } from "react";
import "./CreateEpisodes.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import TextInputLabel from "../../components/TextInputLabel/TextInputLabel";
import Selected from "../../components/Selected/Selected";
import Checkbox from "../../components/Checkbox/Checkbox";
import { PODCAST_TYPES } from "../../constants/constants";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import TextEditor from "../../components/TextEditor/TextEditor";
import TagsInput from "../../components/TagsInput/TagsInput";
import store from "../../store/store";
import UploadAudio from "../../components/UploadAudio/UploadAudio";
import createCurrentDate from "../../utils/createCurrentDate";
import Navbar from "../../components/Navbar/Navbar";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import theme from "../../styles/theme.style";

function CreateEpisodes(props) {
  const [title, setTitle] = useState("");
  const [season, setSeason] = useState("");
  const [episode, setEpisode] = useState("");
  const [selected, setSelected] = useState("");
  const [explicit, setExplicit] = useState(false);
  const [contributors, setContributors] = useState("");
  const [keywords, setKeywords] = useState("");
  const [file, setFile] = useState("");
  const [audio, setAudio] = useState("");
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioLength, setAudioLength] = useState(0);
  const [audioType, setAudioType] = useState("");
  const [pid, setpid] = useState();

  const [errorMsgEpisodeTitle, seterrorMsgEpisodeTitle] = useState("");
  const [errorMsgDescription, seterrorMsgDescription] = useState("");
  const [errorMsgImage, seterrorMsgImage] = useState("");
  const [errorMsgAudio, seterrorMsgAudio] = useState("");

  const { description } = store.getState().textEditorReducer;

  const date = createCurrentDate();

  store.subscribe(() => {
    // When state will be updated(in our case, when items will be fetched),
    // we will update local component state and force component to rerender
    // with new data.
    setAudio(store.getState().audioReducer.audio);
    setAudioDuration(store.getState().audioDurationReducer.duration);
    setAudioLength(store.getState().audioLengthReducer.length);
    setAudioType(store.getState().audioTypeReducer.audiotype);
    setFile(store.getState().imageReducer.image);
  });

  const { id } = useParams();

  const headers = { jwt_token: localStorage.token };

  const sendImageToAWS = () => {
    const formData = new FormData();
    formData.append("image", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const promise = axios.post("/upload-episode-art", formData, config);

    const dataPromise = promise.then((response) => response.data.Location);

    return dataPromise;
  };

  const sendDataToDB = (Location) => {
    const data = {
      episode_title: title,
      episode_audio: audio,
      episode_description: description,
      episode_artwork: Location,
      season_number: season,
      episode_number: episode,
      episode_type: selected,
      explicit_content: explicit,
      episode_contributors: contributors,
      search_keywords: keywords,
      audio_duration: audioDuration,
      episode_audio_length: audioLength,
      episode_audio_type: audioType,
      episode_date_created: date,
    };

    return axios
      .post(`/api/post/episodes/${id}`, data, { headers })
      .then((response) => console.log(response))
      .catch((err) => console.log(err))
      .then(() => props.history.push("/episodes"));
  };

  const submit = () => {
    if (file == "") {
      seterrorMsgImage("Uploading an image is required to create a podcast");
    }

    if (file !== "") {
      seterrorMsgImage("");
    }

    if (title == "") {
      seterrorMsgEpisodeTitle("Please do not leave episode title empty");
    }

    if (title !== "") {
      seterrorMsgEpisodeTitle("");
    }

    if (audio == "") {
      seterrorMsgAudio("Please select an audio file");
    }

    if (audio !== "") {
      seterrorMsgAudio("");
    }

    if (description == "") {
      seterrorMsgDescription("Please add a description for your episode.");
    }

    if (description !== "") {
      seterrorMsgDescription("");
    }

    if (file !== "" && title !== "" && audio !== "" && description !== "") {
      sendImageToAWS().then((Location) => sendDataToDB(Location));
    } else console.log("errors");
  };

  const selectContributors = (tags) => {
    console.log(tags);
    setContributors(tags);
  };

  const selectKeywords = (tags) => {
    console.log(tags);
    setKeywords(tags);
  };

  return (
    <>
      <div style={{ paddingBottom: "5rem" }}>
        <Navbar />
      </div>
      <div
        style={{ marginBottom: "5rem" }}
        className="create-episode-container"
      >
        <div
          style={{
            marginBottom: "1rem",
            paddingTop: "0rem",
          }}
        >
          <h1 style={{ color: theme.TEXT_COLOR_WHITE }}>Create Episode</h1>
        </div>
        <div className="edit-child">
          <TextInputLabel
            color="black"
            label="Episode Title"
            // placeholder="Episode Title Here..."
            onChange={(e) => setTitle(e.target.value)}
          />
          {errorMsgEpisodeTitle ? (
            <ErrorMessage errorMsg={errorMsgEpisodeTitle} />
          ) : null}
        </div>

        <div className="edit-child">
          <UploadAudio label="Upload Audio File" />
          {errorMsgAudio ? <ErrorMessage errorMsg={errorMsgAudio} /> : null}
        </div>
        <div className="edit-child">
          <TextEditor />
          {errorMsgDescription ? (
            <ErrorMessage errorMsg={errorMsgDescription} />
          ) : null}
        </div>

        <ImageUpload label="Episode Artwork" />
        {errorMsgImage ? <ErrorMessage errorMsg={errorMsgImage} /> : null}

        <div className="edit-child">
          <div
            style={{ display: "inline-block", width: "31%", marginRight: "2%" }}
          >
            <TextInputLabel
              color="black"
              label="Season # (Optional)"
              // placeholder="Episode Title Here..."
              onChange={(e) => setSeason(e.target.value)}
            />
          </div>
          <div
            style={{ display: "inline-block", width: "31%", marginRight: "2%" }}
          >
            <TextInputLabel
              color="black"
              label="Episode # (Optional)"
              // placeholder="Episode Title Here..."
              onChange={(e) => setEpisode(e.target.value)}
            />
          </div>
          <div style={{ display: "inline-block", width: "34%" }}>
            <Selected
              color="black"
              label="Episode Type (Optional)"
              onChange={(e) => setSelected(e.value)}
              value={selected.value}
              options={PODCAST_TYPES}
            />
          </div>
          <TagsInput
            label="Episode Contributors (Optional)"
            placeholder="After typing press enter to add contributors"
            selectedTags={selectContributors}
            tags={[]}
          />
          <TagsInput
            label="Search Keywords (Optional)"
            placeholder="After typing press enter to add tags"
            selectedTags={selectKeywords}
            tags={[]}
          />
          <Checkbox onChange={() => setExplicit(!explicit)} />

          <div className="bottom">
            <div className="episode-submit-container">
              <PrimaryButton
                style={{ width: "100%" }}
                fx={submit}
                title="Submit"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateEpisodes;
