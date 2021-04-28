import React, { useState } from 'react'; //useState is a react hook
import { Form, Button } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView(props) {
  //excluding the 'extends React.Component' bc this is a function component, not class component. And can use hooks
  const [username, setUsername] = useState(''); // assigns an empty string to the username variable—and assigns to the setUsername variable a method to update the username variable
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    console.log('===============HERE in handleSubmit of registration view');
    //the callback function
    e.preventDefault(); //prevents the default refresh/change of the page
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    // <form>
    //   <label>
    //     Username:
    //     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
    //   </label>
    //   <label>
    //     Password:
    //     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //   </label>
    //   <label>
    //     Email:
    //     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    //   </label>
    //   <label>
    //     Birthday:
    //     <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
    //   </label>
    //   <button type="submit" onClick={handleSubmit}>
    //     Submit
    //   </button>
    // </form>
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

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}