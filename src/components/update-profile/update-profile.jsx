import React, { useState } from 'react'; //useState is a react hook

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './update-profile.scss';

export function UpdateProfile(props) {
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
    axios
      .put('https://jennysflix.herokuapp.com/users/${props.userData.username}`}', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log('updated profile data', data);
        // props.setRequestType('put');
        // window.open('/', '_self');
      })
      .catch((e) => {
        console.log('Something went wrong with profile update! check that fields are valid');
      });
  };

  return (
    <Container>
      <h1 className="title">MyFlix</h1>
      <br></br>
      <div id="registration-container">
        <h3>Update User Information</h3>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formUsername">
            <Form.Label>Birthday</Form.Label>
            <Form.Control type="date" onChange={(e) => setBirthday(e.target.value)} />
          </Form.Group>

          <Button variant="info" type="submit" onClick={handleSubmit}>
            Submit
          </Button>

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
