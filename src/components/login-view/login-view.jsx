import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './login-view.scss';

//excluding the 'extends React.Component' bc this is a function component, not class component. And can use hooks
export function LoginView(props) {
  const { onLoggedIn } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://jennysflix.herokuapp.com/login', { Username: username, Password: password })
      .then((response) => {
        const data = response.data;
        onLoggedIn(data);
      })
      .catch((e) => {
        alert('Incorrect Username or Password. Please try again or register if you are a new user.');
        window.open('/login', '_self');
        console.log('User not found');
      });
  };

  return (
    <Container className="login-container">
      <h4 className="login-subtitle">Login or create an account</h4>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" autoComplete="username" onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" autoComplete="password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="info" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        <Link to={`/users`}>
          <Button variant="link">Register New User</Button>
        </Link>
      </Form>
    </Container>
  );
}
