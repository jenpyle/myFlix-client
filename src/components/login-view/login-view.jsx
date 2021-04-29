import React, { useState } from 'react'; //useState is a react hook
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import './login-view.scss';

export function LoginView(props) {
  //excluding the 'extends React.Component' bc this is a function component, not class component. And can use hooks
  const [username, setUsername] = useState(''); // assigns an empty string to the username variable—and assigns to the setUsername variable a method to update the username variable
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    console.log('===============inside handleSubmit in LOGIN-VIEW..username, password = ', username, password);

    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post('https://jennysflix.herokuapp.com/login', { Username: username, Password: password }) //POST request is made to the login endpoint by passing the username and password
      .then((response) => {
        //If there’s a match, the onLoggedIn method that was passed through the props is called
        const data = response.data; //contains the token that was generated...and more
        props.onLoggedIn(data); //which provides the username to our parent component (child to parent communication)
      })
      .catch((e) => {
        console.log('User not found');
      });
  };

  const handleRegister = () => {
    console.log(
      '===============inside handleRegister from LOGIN-VIEW... set newUser from null to undefined(or whatever you type in form) username(AKA newUser)=',
      username
    );
    props.onRegisterNewUser(username);
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <Button variant="secondary" type="button" onClick={handleRegister}>
        Register New User
      </Button>
    </Form>
  );
}
