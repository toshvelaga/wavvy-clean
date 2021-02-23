import React, { useState, useEffect } from 'react';
import './EditEpisodes.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import TextInputLabel from '../../components/TextInputLabel/TextInputLabel';
import Selected from '../../components/Selected/Selected';
import Checkbox from '../../components/Checkbox/Checkbox';
import { PODCAST_TYPES } from '../../constants/constants';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import EditImage from '../../components/EditImage/EditImage';
import TextEditor from '../../components/TextEditor/TextEditor';
import TagsInput from '../../components/TagsInput/TagsInput';
import store from '../../store/store';
import { getImage } from '../../store/actions/actions';
import Navbar from '../../components/Navbar/Navbar';

function EditEpisodes(props) {
  const [title, setTitle] = useState('');
  const [season, setSeason] = useState('');
  const [episode, setEpisode] = useState('');
  const [selected, setSelected] = useState('');
  const [explicit, setExplicit] = useState(false);
  // const [artist, setArtist] = useState("");
  // const [webpage, setWebpage] = useState("");
  const [data, setData] = useState('');
  const [contributors, setContributors] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [episode_description, setepisode_description] = useState('');

  // const audioLocation = store.getState().audioReducer.audio;

  const { id } = useParams();

  const headers = { jwt_token: localStorage.token };

  store.subscribe(() => {
    // When state will be updated(in our case, when items will be fetched),
    // we will update local component state and force component to rerender
    // with new data.
    setepisode_description(store.getState().textEditorReducer.description);
  });

  useEffect(() => {
    axios.get(`/api/get/episodes/${id}`, { headers }).then((res) => {
      setData(res.data.episode_description);
      setContributors(res.data.episode_contributors);
      setKeywords(res.data.search_keywords);
      setTitle(res.data.episode_title);
      setSeason(res.data.season_number);
      setEpisode(res.data.episode_number);
      setSelected({
        value: res.data.episode_type,
        label: res.data.episode_type,
      });
      setImagePreviewUrl(res.data.episode_artwork);
      setExplicit(res.data.episode_explicit_content);
      console.log(res.data);
    });
  }, [id]);

  const handleSubmit = () => {
    const data = {
      episode_title: title,
      // episode_audio: audioLocation,
      episode_description,
      episode_artwork: imagePreviewUrl,
      season_number: season,
      episode_number: episode,
      episode_type: selected.value,
      episode_explicit_content: explicit,
      episode_contributors: contributors,
      search_keywords: keywords,
    };

    axios
      .put(`/api/update/episodes/${id}`, data, { headers })
      .then((response) => console.log(response))
      .then(() => props.history.push('/episodes'))
      .catch((err) => console.log(err));
  };

  const selectedTags = (tags) => {
    console.log(tags);
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

  const removeContributors = (indexToRemove) => {
    setContributors([
      ...contributors.filter((_, index) => index !== indexToRemove),
    ]);
  };

  const addContributors = (event) => {
    if (event.target.value !== '') {
      setContributors([...contributors, event.target.value]);
      // props.selectedTags([...contributors, event.target.value]);
      event.target.value = '';
    }
  };

  const removeKeywords = (indexToRemove) => {
    setKeywords([...keywords.filter((_, index) => index !== indexToRemove)]);
  };

  const addKeywords = (event) => {
    if (event.target.value !== '') {
      setKeywords([...keywords, event.target.value]);
      // props.selectedTags([...keywords, event.target.value]);
      event.target.value = '';
    }
  };

  return (
    <>
      <div style={{ paddingBottom: '5rem' }}>
        <Navbar />
      </div>
      <div className="edit-container">
        <div
          style={{
					  marginBottom: '1rem',
					  paddingTop: '0rem',
          }}
        >
          <h1>Edit Episode</h1>
        </div>
        <div className="edit-child">
          <TextInputLabel
            color="black"
            label="Episode Title"
            value={title}
            placeholder="Episode Title Here..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="edit-child">{/* <Dropzone /> */}</div>
        <div className="edit-child">
          <TextEditor data={data} />
        </div>
        <EditImage
          label="Episode Artwork"
          imagePreviewUrl={imagePreviewUrl}
          onChange={_handleImageChange}
        />
        <div className="edit-child">
          <div
            style={{ display: 'inline-block', width: '31%', marginRight: '2%' }}
          >
            <TextInputLabel
              color="black"
              label="Season #"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
            />
          </div>
          <div
            style={{ display: 'inline-block', width: '31%', marginRight: '2%' }}
          >
            <TextInputLabel
              color="black"
              label="Episode #"
              value={episode}
              onChange={(e) => setEpisode(e.target.value)}
            />
          </div>
          <div style={{ display: 'inline-block', width: '34%' }}>
            <Selected
              color="black"
              label="Episode Type"
              onChange={(e) => setSelected(e)}
              value={selected}
              options={PODCAST_TYPES}
            />
          </div>
          <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <label
              style={{ display: 'block', color: 'black' }}
              className="label"
              htmlFor="fname"
            >
              Episode Contributors
            </label>
            <input
              type="text"
              onKeyUp={(event) => (event.key === 'Enter' ? addContributors(event) : null)}
              placeholder="Press enter to add tags"
            />
            <ul id="tags">
              {contributors.map((tag, index) => (
                <li key={index} className="tag">
                  <span className="tag-title">{tag}</span>
                  <span
                    className="tag-close-icon"
                    onClick={() => removeContributors(index)}
                  >
                    x
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <label
              style={{ display: 'block', color: 'black' }}
              className="label"
              htmlFor="fname"
            >
              Search Keywords
            </label>
            <input
              type="text"
              onKeyUp={(event) => (event.key === 'Enter' ? addKeywords(event) : null)}
              placeholder="Press enter to add tags"
            />
            <ul id="tags">
              {keywords.map((tag, index) => (
                <li key={index} className="tag">
                  <span className="tag-title">{tag}</span>
                  <span
                    className="tag-close-icon"
                    onClick={() => removeKeywords(index)}
                  >
                    x
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <Checkbox
            onChange={() => setExplicit(!explicit)}
            value={explicit}
            checked={explicit}
          />
          <div className="bottom">
            <div>
              <PrimaryButton fx={handleSubmit} title="Save" />
            </div>
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

export default connect(null, mapDispatchToProps)(EditEpisodes);
