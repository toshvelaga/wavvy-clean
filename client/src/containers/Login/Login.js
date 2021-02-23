import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TextInputLabel from '../../components/TextInputLabel/TextInputLabel';
import TextInputPassword from '../../components/TextInputLabel/TextInputPassword';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import './Login.css';
import store from '../../store/store';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

// TUTORIAL NEED TO WATCH: https://www.youtube.com/watch?v=H7qkTzxk_0I&ab_channel=CodingGarden
// documentation for storing password to DB: www.youtube.com/watch?v=vxu1RrR0vbw

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsgEmail, seterrorMsgEmail] = useState('');
  const [errorMsgPassword, seterrorMsgPassword] = useState('');

  const submit = () => {
    const data = {
      email,
      password,
    };

    axios
      .post('/login', data)
      .then((res) => localStorage.setItem('token', res.data.jwtToken))
      .then(() => store.dispatch({ type: 'LOGIN' }))
      .catch((err) => createErrorMsgs(err));
  };

  const createErrorMsgs = (err) => {
    seterrorMsgEmail(err.response.data.email);
    seterrorMsgPassword(err.response.data.password);
  };

  return (
    <>
      <div className="login-container">
        <h1 style={{ marginBottom: '2rem', color: '#fff' }}>
          Welcome to Wavvy
        </h1>
        <div style={{ marginBottom: '.5em' }}>
          <TextInputLabel
            label="Email Address"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorMsgEmail ? <ErrorMessage errorMsg={errorMsgEmail} /> : null}
        </div>
        <div>
          <TextInputPassword
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMsgPassword ? (
            <ErrorMessage errorMsg={errorMsgPassword} />
          ) : null}
        </div>
        <p style={{ color: 'grey', marginTop: '.5rem' }}>
          <Link
            style={{
              textDecoration: 'none',
              color: 'grey',
            }}
            to="/forgot-password"
          >
            Forgot your username or password?
          </Link>
        </p>
        <div className="login-button">
          <PrimaryButton style={{ width: '100%' }} title="Submit" fx={submit} />
        </div>
        <p style={{ color: 'grey', marginTop: '1rem', textAlign: 'center' }}>
          <Link
            style={{
              textDecoration: 'none',
              color: 'grey',
            }}
            to="/register"
          >
            Don't have an account? Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
