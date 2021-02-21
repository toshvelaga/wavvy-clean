import React, { useEffect, useState } from 'react';
import './ForgotPassword.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import TextInputLabel from '../../components/TextInputLabel/TextInputLabel';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

// Email Recovery with nodemailer: https://itnext.io/password-reset-emails-in-your-react-app-made-easy-with-nodemailer-bb27968310d7

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errorMsgEmail, setErrorMsgEmail] = useState('');

  const styles = { marginBottom: '.5em' };

  const { addToast } = useToasts();

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('forgot-password', {
        email,
      });

      if (response.data.success === 'recovery email sent') {
        addToast('Recovery email sent. Please check your email', {
          appearance: 'success',
        });
      }
    } catch (error) {
      setErrorMsgEmail(error.response.data.email);
    }
  };

  return (
    <>
      <div className="login-container">
        <h1 style={{ marginBottom: '2rem', color: '#fff' }}>
          Please enter your email to reset your password...
        </h1>
        <div style={styles}>
          <TextInputLabel
            label="Email Address"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorMsgEmail ? <ErrorMessage errorMsg={errorMsgEmail} /> : null}
          {/* <p style={{ color: "red", marginBottom: ".5rem" }}>{errorMsgEmail}</p> */}
        </div>

        <div className="login-button">
          <PrimaryButton
            style={{ width: '100%' }}
            title="Submit"
            fx={sendEmail}
          />
        </div>
        <p style={{ color: 'grey', marginTop: '1rem', textAlign: 'center' }}>
          <Link
            style={{
						  textDecoration: 'none',
						  color: 'grey',
            }}
            to="/register"
          >
            Don't have an account? Sign up here
          </Link>
        </p>
      </div>
    </>
  );
}

export default ForgotPassword;
