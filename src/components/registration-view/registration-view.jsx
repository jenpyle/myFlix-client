import React, { useState } from 'react'; //useState is a react hook
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

import './registration-view.scss';

export function RegistrationView(props) {
  //excluding the 'extends React.Component' bc this is a function component, not class component. And can use hooks
  const [username, setUsername] = useState(''); // assigns an empty string to the username variable—and assigns to the setUsername variable a method to update the username variable
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    console.log('========in handleSubmit of registration view');
    e.preventDefault(); //prevents the default refresh/change of the page
    console.log(username, password, email, birthday);
    axios
      .post('https://jennysflix.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then(() => {
        props.onLoggedOut(); //changing state of user and newUser so login view is rendered
      })
      .catch((e) => {
        console.log('Something went wrong with user registration! check that fields are valid');
      });
  };

  const handleBackClick = (e) => {
    console.log('handleBackClick of Registration-View');
    props.onLoggedOut(); //changing state of user and newUser so login view is rendered
  };

  return (
    <Container>
      <h1 className="title">MyFlix</h1>
      <br></br>
      <div id="registration-container">
        <h3>Register new user</h3>
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
          <Button variant="secondary" type="button" onClick={handleBackClick}>
            Back
          </Button>
        </Form>
      </div>
    </Container>
  );
}
