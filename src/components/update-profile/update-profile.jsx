import React, { useState } from 'react'; //useState is a react hook

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './update-profile.scss';

export function UpdateProfile(props) {
  console.log('inside of Update profile');
  //excluding the 'extends React.Component' bc this is a function component, not class component. And can use hooks
  const [username, setUsername] = useState(''); // assigns an empty string to the username variable—and assigns to the setUsername variable a method to update the username variable
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  // const [requestType, setRequest] = useState('');

  const handleSubmit = (e) => {
    console.log('========in handleSubmit of UPDATE PROFILE');
    e.preventDefault(); //prevents the default refresh/change of the page
    console.log(username, password, email, birthday);
    let accessToken = localStorage.getItem('token');
    console.log(accessToken);
    axios
      .put(
        `https://jennysflix.herokuapp.com/users/${props.userData.Username}`,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        console.log('updated profile data', data);

        window.open(`/users/${localStorage.getItem('user')}`, '_self');
        props.setRequestType(null);
      })
      .then(() => {
        alert('Profile successfully updated.');
      })
      .catch((e) => {
        console.log('Something went wrong with profile update! check that fields are valid');
      });
  };

  return (
    <Container>
      <div id="registration-container">
        <h3>Update User Information</h3>
        <Form>
          <Form.Group controlId="formUpdateUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              autoComplete="username"
              defaultValue={props.userData.Username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Text id="passwordHelpBlock" muted>
              Please confirm your current password
            </Form.Text>
            <Form.Control
              type="password"
              autoComplete="current password"
              aria-describedby="passwordHelpBlock"
              placeholder="Current Password"
            />
          </Form.Group>
          <Form.Group controlId="formNewPassword">
            <Form.Text id="passwordHelpBlock" muted>
              Your new password must be at least 4 characters long
            </Form.Text>
            <Form.Control
              controlId="formUpdatePassword"
              type="password"
              autoComplete="new password"
              placeholder="New Password"
              aria-describedby="passwordConfirm"
            />
          </Form.Group>
          <Form.Group controlId="formConfirmNewPassword">
            <Form.Control
              controlId="formUpdatePassword"
              type="password"
              autoComplete="confirm new password"
              placeholder="Confirm New Password"
              aria-describedby="passwordHelpBlock"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formUpdateEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="example@email.com"
              autoComplete="email"
              defaultValue={props.userData.Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formUpdateBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              placeholder="date"
              // autoComplete="birthday"
              defaultValue={props.userData.Birthday.substr(0, 10)}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>
          {/* <Link to={`/users/${props.userData.Username}`}> */}
          <Button variant="info" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          {/* </Link> */}
          <Button
            variant="info"
            onClick={() => {
              props.setRequestType(null);
            }}
          >
            Back
          </Button>
        </Form>
      </div>
    </Container>
  );
}
