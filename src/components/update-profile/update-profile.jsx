import React, { useState } from 'react'; //useState is a react hook

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './update-profile.scss';

export function UpdateProfile(props) {
  console.log('inside of Update profile');
  //excluding the 'extends React.Component' bc this is a function component, not class component. And can use hooks
  const [username, setUsername] = useState(''); // assigns an empty string to the username variable—and assigns to the setUsername variable a method to update the username variable
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState();
  const [birthday, setBirthday] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = (e) => {
    const formData = {};
    username ? (formData.Username = username) : (formData.Username = props.userData.Username);
    password ? (formData.Password = password) : (formData.Password = props.userData.Password);
    email ? (formData.Email = email) : (formData.Email = props.userData.Email);
    birthday ? (formData.Birthday = birthday) : (formData.Birthday = props.userData.Birthday.substr(0, 10));
    console.log('========in handleSubmit of UPDATE PROFILE');
    e.preventDefault(); //prevents the default refresh/change of the page
    console.log('form data = ', formData);
    let accessToken = localStorage.getItem('token');
    console.log(accessToken);
    axios
      .put(`https://jennysflix.herokuapp.com/users/${props.userData.Username}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const data = response.data;
        console.log('...............updated profile data', data);
        localStorage.setItem('user', data.Username);
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

  const handleDelete = (e) => {
    e.preventDefault();
    let accessToken = localStorage.getItem('token');
    axios
      .delete(`https://jennysflix.herokuapp.com/users/${props.userData.Username}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/', '_self');
      })
      .then(() => {
        alert('Profile successfully deleted.');
      })
      .catch((e) => {
        console.log('Something went wrong with profile update! check that fields are valid');
      });
  };

  const setModalIsOpenToTrue = (e) => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  return (
    <Container>
      <Modal show={modalIsOpen} onHide={setModalIsOpenToFalse}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Account cannot be recovered after deregistering</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="info" onClick={setModalIsOpenToFalse}>
              Back
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>

      <div id="registration-container">
        <h3>Update User Information</h3>
        <Form>
          <Form.Group controlid="formUpdateUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              autoComplete="username"
              defaultValue={props.userData.Username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlid="formNewPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Text id="passwordHelpBlock" muted>
              Your new password must be at least 4 characters long
            </Form.Text>
            <Form.Control
              controlid="formUpdatePassword"
              type="password"
              autoComplete="password"
              placeholder="New Password"
              aria-describedby="passwordConfirm"
              defaultValue={props.userData.Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlid="formUpdateEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="example@email.com"
              autoComplete="email"
              defaultValue={props.userData.Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlid="formUpdateBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              placeholder="date"
              // autoComplete="birthday"
              defaultValue={props.userData.Birthday.substr(0, 10)}
              onChange={(e) => setBirthday(e.target.value)}
            />
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
          <Button variant="danger" type="submit" onClick={setModalIsOpenToTrue}>
            {/* <Button variant="danger" type="submit" > */}
            Delete Account
          </Button>
        </Form>
      </div>
    </Container>
  );
}
