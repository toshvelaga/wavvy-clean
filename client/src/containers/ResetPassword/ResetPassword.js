import React, { useState, useEffect } from 'react';
import './ResetPassword.css';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import TextInputLabel from '../../components/TextInputLabel/TextInputLabel';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMsgPassword, seterrorMsgPassword] = useState('');
  const [tokenCheck, setTokenCheck] = useState('');

  const { id } = useParams();
  const { uid } = useParams();

  const { addToast } = useToasts();

  const resetPassword = () => {
    const data = {
      user_id: uid,
      newpassword: newPassword,
      newpassword2: confirmNewPassword,
    };
    return axios
      .patch('/reset/new-password', data)
      .then(() => addToast(
        'Password succesfully changed! Please log in using your new password.',
        {
          appearance: 'success',
        },
      ))
      .catch((err) => seterrorMsgPassword(err.response.data.password));
  };

  useEffect(() => {
    axios.get(`/reset/${id}`).then((res) => setTokenCheck(res.data));
  }, []);

  return (
    <>
      {tokenCheck === 'Invalid or Expired Token' ? (
        <h2 style={{ color: 'red', margin: '5rem 0', textAlign: 'center' }}>
          Invalid or Expired Token
        </h2>
      ) : (
        <div style={{ width: '50%', margin: 'auto' }}>
          <div style={{ marginTop: '0', paddingTop: '5rem', color: '#fff' }}>
            <h1>Reset Password</h1>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <TextInputLabel
              label="New Password"
							// placeholder="old password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div style={{ marginTop: '.5rem' }}>
            <TextInputLabel
              label="Confirm New Password"
							// placeholder="old password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <p style={{ color: 'red', marginBottom: '.5rem' }}>
              {errorMsgPassword}
            </p>
          </div>
          <div className="register-button">
            <PrimaryButton
              style={{ width: '100%' }}
              title="Update Profile"
              fx={resetPassword}
            />
          </div>
          <p style={{ color: 'grey', marginTop: '1rem', textAlign: 'center' }}>
            <Link
              style={{
							  textDecoration: 'none',
							  color: 'grey',
              }}
              to="/login"
            >
              Go back to Login
            </Link>
          </p>
        </div>
      )}
    </>
  );
}

export default ResetPassword;
