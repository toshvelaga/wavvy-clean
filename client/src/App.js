import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import CreateEpisodes from './containers/CreateEpisodes/CreateEpisodes';
import Analytics from './containers/Analytics/Analytics';
import EditEpisodes from './containers/EditEpisodes/EditEpisodes';
import Podcasts from './containers/Podcasts/Podcasts';
import Episodes from './containers/Episodes/Episodes';
import Settings from './containers/Settings/Settings';
import CreatePodcasts from './containers/CreatePodcasts/CreatePodcasts';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import './App.css';
import EditPodcast from './containers/EditPodcast/EditPodcast';
import NewEpisode from './containers/NewEpisode/NewEpisode';
import ForgotPassword from './containers/ForgotPassword/ForgotPassword';
import AudioPlayer from './containers/AudioPlayer/AudioPlayer';
import { authenticate, unauthenticate } from './store/actions/actions';
import ResetPassword from './containers/ResetPassword/ResetPassword';
import AudioWidget from './containers/AudioWidget/AudioWidget';
import Website from './website/Website/Website';
import LandingPage from './containers/LandingPage/LandingPage';
import WebsiteSettings from './containers/WebsiteSettings/WebsiteSettings';
import EditWebsite from './containers/EditWebsite/EditWebsite';
import Terms from './website/Terms/Terms';
import Privacy from './website/Privacy/Privacy';
import LandingPageSocial from './containers/LandingPage/LandingPageSocial';
import LandingPageSupport from './containers/LandingPage/LandingPageSupport';

function App(props) {
  useEffect(() => {
    checkAuthenticated();
  }, []);

  const checkAuthenticated = async () => {
    try {
      const res = await fetch('/verify', {
        method: 'POST',
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();
      console.log(parseRes);
      parseRes === true ? props.authenticate() : props.unauthenticate();
    } catch (err) {
      console.error(err.message);
    }
  };

  const { isAuthenticated } = props;

  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) => (!isAuthenticated ? (
              <Login {...props} />
            ) : (
              <Redirect to="/podcasts" />
            ))}
          />
          <Route
            exact
            path="/register"
            render={(props) => (!isAuthenticated ? (
              <Register {...props} />
            ) : (
              <Redirect to="/podcasts" />
            ))}
          />

          <Route
            exact
            path="/forgot-password"
            render={(props) => (!isAuthenticated ? (
              <ToastProvider>
                <ForgotPassword {...props} />
              </ToastProvider>
            ) : (
              <Redirect to="/podcasts" />
            ))}
          />

          <Route
            exact
            path="/:id/podcasts"
            render={(props) => (isAuthenticated ? <Podcasts {...props} /> : <Login to="/login" />)}
          />

          <Route
            exact
            path="/settings"
            render={(props) => (isAuthenticated ? (
              <ToastProvider>
                <Settings {...props} />
              </ToastProvider>
            ) : (
              <Login to="/login" />
            ))}
          />

          <Route
            exact
            path="/podcasts/create"
            render={(props) => (isAuthenticated ? (
              <CreatePodcasts {...props} />
            ) : (
              <Login to="/login" />
            ))}
          />

          <Route
            exact
            path="/podcasts/settings/:id"
            render={(props) => (isAuthenticated ? (
              <EditPodcast {...props} />
            ) : (
              <Login to="/login" />
            ))}
          />

          <Route
            exact
            path="/podcasts/:id/episodes/create"
            render={(props) => (isAuthenticated ? (
              <CreateEpisodes {...props} />
            ) : (
              <Login to="/login" />
            ))}
          />

          <Route
            exact
            path="/episodes/create"
            render={(props) => (isAuthenticated ? (
              <NewEpisode {...props} />
            ) : (
              <Login to="/login" />
            ))}
          />

          <Route
            exact
            path="/episodes"
            render={(props) => (isAuthenticated ? (
              <ToastProvider>
                <Episodes {...props} />
              </ToastProvider>
            ) : (
              <Login to="/login" />
            ))}
          />

          <Route
            exact
            path="/episodes/:id/audio"
            render={(props) => (isAuthenticated ? (
              <AudioPlayer {...props} />
            ) : (
              <Login to="/login" />
            ))}
          />

          <Route
            exact
            path="/analytics/:id"
            render={(props) => (isAuthenticated ? <Analytics {...props} /> : <Login to="/login" />)}
          />

          <Route
            exact
            path="/episodes/:id/embed-audio-player"
            component={AudioWidget}
          />

          <Route
            exact
            path="/:id/episodes"
            render={(props) => (isAuthenticated ? (
              <ToastProvider>
                <Episodes {...props} />
              </ToastProvider>
            ) : (
              <Login to="/login" />
            ))}
          />

          <Route
            exact
            path="/podcasts"
            render={(props) => (isAuthenticated ? <Podcasts {...props} /> : <Login to="/login" />)}
          />
          <Route
            exact
            path="/:uid/reset/:id"
            render={() => (
              <ToastProvider>
                <ResetPassword />
              </ToastProvider>
            )}
          />

          <Route exact path="/episodes/:id/edit" component={EditEpisodes} />
          <Route exact path="/" component={Website} />
          <Route exact path="/terms" component={Terms} />
          <Route exact path="/privacy-policy" component={Privacy} />
          <Route
            exact
            path="/website-settings"
            render={(props) => (isAuthenticated ? (
              <WebsiteSettings {...props} />
            ) : (
              <Login to="/login" />
            ))}
          />

          <Route exact path="/:id" component={LandingPage} />
          <Route exact path="/:id/support" component={LandingPageSupport} />
          <Route exact path="/:id/social" component={LandingPageSocial} />
          <Route
            exact
            path="/edit/:id"
            render={(props) => (isAuthenticated ? (
              <ToastProvider>
                <EditWebsite {...props} />
              </ToastProvider>
            ) : (
              <Login to="/login" />
            ))}
          />
        </Switch>
      </Router>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  authenticate: () => dispatch(authenticate()),
  unauthenticate: () => dispatch(unauthenticate()),
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
