import React, { useState } from 'react'; //useState is a react hook
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss';

export function LoginView(props) {
  //excluding the 'extends React.Component' bc this is a function component, not class component. And can use hooks
  const [username, setUsername] = useState(''); // assigns an empty string to the username variable—and assigns to the setUsername variable a method to update the username variable
  const [password, setPassword] = useState('');

  console.log('in login view');
  const handleSubmit = (e) => {
    console.log('===============inside handleSubmit');
    //the callback function
    e.preventDefault(); //prevents the default refresh/change of the page
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  const handleRegister = (e) => {
    console.log('===============inside handleRegister');
    props.onRegisterNewUser(username);
  };

  // return (
  //   <form>
  //     <button type="button" onClick={handleRegister}>
  //       Register New User
  //     </button>
  //     <br></br>
  //     <label>
  //       Username:
  //       <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
  //     </label>
  //     <label>
  //       Password:
  //       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
  //     </label>
  //     <button type="submit" onClick={handleSubmit}>
  //       Submit
  //     </button>
  //   </form>
  // );
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
