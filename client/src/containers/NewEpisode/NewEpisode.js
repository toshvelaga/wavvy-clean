import React, { useState, useEffect } from "react";
import "./NewEpisode.css";
import axios from "axios";
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

function NewEpisode(props) {
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
  const [pid, setpid] = useState("");
  const [options, setOptions] = useState([]);

  const [errorMsgpid, seterrorMsgpid] = useState("");
  const [errorMsgTitle, seterrorMsgTitle] = useState("");
  const [errorMsgAudio, seterrorMsgAudio] = useState("");

  const { description } = store.getState().textEditorReducer;

  store.subscribe(() => {
    // When state will be updated(in our case, when items will be fetched),
    // we will update local component state and force component to rerender
    // with new data.
    setAudioDuration(store.getState().audioDurationReducer.duration);
    setAudio(store.getState().audioReducer.audio);
    setFile(store.getState().imageReducer.image);
  });

  // use id to add select for which podcast

  const headers = { jwt_token: localStorage.token };

  const date = createCurrentDate();

  useEffect(() => {
    axios
      .get("/api/get/podcasts/options", { headers })
      .then((res) => setOptions(res.data));
  }, []);

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
      audio_duration: audioDuration,
      episode_description: description,
      episode_artwork: Location,
      season_number: season,
      episode_number: episode,
      episode_type: selected,
      explicit_content: explicit,
      episode_contributors: contributors,
      search_keywords: keywords,
      pid,
      episode_date_created: date,
    };

    return axios
      .post("/api/post/new-episode", data, { headers })
      .then((response) => console.log(response))
      .catch((err) => console.log(err))
      .then(() => props.history.push("/episodes"));
  };

  const submit = () => {
    if (pid == "") {
      seterrorMsgpid("Please select a podcast you want to add an episode to");
    }

    if (title == "") {
      seterrorMsgTitle("Please add a title for your episode");
    }

    if (audio == "") {
      seterrorMsgAudio("Please choose an audio file");
    } else sendImageToAWS().then((Location) => sendDataToDB(Location));
  };

  const onChangeHandler = (result) => {
    axios
      .get(`/api/get/podcast/${result.value}/episodes`, { headers })
      .then((res) => console.log(res.data.value));
  };

  const result = options.map((opt) => ({
    value: opt.pid,
    label: opt.podcast_title,
  }));

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
            paddingTop: "0rem",
          }}
        >
          <h1 style={{ color: theme.TEXT_COLOR_WHITE }}>Create Episode</h1>
        </div>
        <div style={{ display: "inline-block", width: "100%" }}>
          <Selected
            color={theme.TEXT_COLOR_WHITE}
            label="Choose Podcast"
            onChange={(e) => setpid(e.value)}
            value={selected.value}
            options={result}
          />
          {errorMsgpid ? <ErrorMessage errorMsg={errorMsgpid} /> : null}
        </div>
        <div className="edit-child">
          <TextInputLabel
            color={theme.TEXT_COLOR_WHITE}
            label="Episode Title"
            // placeholder="Episode Title Here..."
            onChange={(e) => setTitle(e.target.value)}
          />
          {errorMsgTitle ? <ErrorMessage errorMsg={errorMsgTitle} /> : null}
        </div>

        <div className="edit-child">
          {/* <Dropzone /> */}
          <UploadAudio label="Upload Audio File" />
          {errorMsgAudio ? <ErrorMessage errorMsg={errorMsgAudio} /> : null}
        </div>
        <div className="edit-child">
          <TextEditor />
        </div>
        <ImageUpload label="Episode Artwork" />
        <div className="edit-child">
          <div
            style={{ display: "inline-block", width: "31%", marginRight: "2%" }}
          >
            <TextInputLabel
              color={theme.TEXT_COLOR_WHITE}
              label="Season # (Optional)"
              // placeholder="Episode Title Here..."
              onChange={(e) => setSeason(e.target.value)}
            />
          </div>
          <div
            style={{ display: "inline-block", width: "31%", marginRight: "2%" }}
          >
            <TextInputLabel
              color={theme.TEXT_COLOR_WHITE}
              label="Episode # (Optional)"
              // placeholder="Episode Title Here..."
              onChange={(e) => setEpisode(e.target.value)}
            />
          </div>
          <div style={{ display: "inline-block", width: "34%" }}>
            <Selected
              color={theme.TEXT_COLOR_WHITE}
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

          <div className="episode-submit-container">
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

export default NewEpisode;
