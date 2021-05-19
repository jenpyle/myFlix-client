import React, { useState } from 'react'; //useState is a react hook
import { Container, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import './update-profile.scss';

export function UpdateProfile(props) {
  const { userData, setRequestType, getOneUser } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState();
  const [birthday, setBirthday] = useState('');
  const [checked, setChecked] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let accessToken = localStorage.getItem('token');
  let urlString = `https://jennysflix.herokuapp.com/users/${userData.Username}`;
  const headers = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const formValidation = (formData, checked) => {
    let isValid = 'valid';
    if (formData.Username.length < 5) isValid = 'Username must be at least 5 characters long';
    if (checked && formData.Password === '') isValid = 'Password cannot be empty';
    if (formData.Email.includes('.') === false || formData.Email.includes('@') === false) isValid = 'Email is invalid';
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};

    username ? (formData.Username = username) : (formData.Username = userData.Username);
    if (checked) {
      formData.Password = password;
      urlString = `https://jennysflix.herokuapp.com/users/${userData.Username}/password`;
    }
    email ? (formData.Email = email) : (formData.Email = userData.Email);
    birthday ? (formData.Birthday = birthday) : (formData.Birthday = userData.Birthday.substr(0, 10));

    let isValid = formValidation(formData, checked);

    if (isValid !== 'valid') {
      alert(isValid);
    }

    if (isValid === 'valid') {
      axios
        .put(urlString, formData, headers)
        .then((response) => {
          localStorage.setItem('user', response.data.Username);
          getOneUser(accessToken);
          alert('Profile successfully updated.');
        })
        .then((response) => {
          setRequestType('get');
          window.open(`/users/${response.data.Username}`, '_self');
        })
        .catch((err) => {
          alert(err.response.data);
          console.log('Something went wrong with profile update! check that fields are valid');
        });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(urlString, headers)
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/login', '_self');
      })
      .then(() => {
        alert('Profile successfully deleted.');
      })
      .catch((e) => {
        console.log('Something went wrong with profile update! check that fields are valid');
      });
  };

  const displayPassworyField = (checked) => {
    if (checked) {
      return (
        <React.Fragment>
          <Form.Text id="passwordHelpBlock" muted>
            Your new password must be at least 4 characters long
          </Form.Text>
          <Form.Control
            controlid="formUpdatePassword"
            type="password"
            autoComplete="password"
            placeholder="New Password"
            aria-describedby="New Pssword input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </React.Fragment>
      );
    }
  };

  return (
    <Container>
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Account cannot be recovered after deregistering</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalIsOpen(false)}>
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
              defaultValue={userData.Username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlid="formNewPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                onChange={() => setChecked(!checked)}
                checked={checked}
                label="Change password"
                onClick={(checked) => displayPassworyField(checked)}
              />
            </Form.Group>
            {displayPassworyField(checked)}
          </Form.Group>

          <Form.Group controlid="formUpdateEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="example@email.com"
              autoComplete="email"
              defaultValue={userData.Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlid="formUpdateBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              placeholder="date"
              defaultValue={userData.Birthday.substr(0, 10)}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>

          <Button variant="info" type="submit" onClick={handleSubmit}>
            Submit
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              setRequestType('get');
            }}
          >
            Back
          </Button>
          <Button variant="danger" type="button" onClick={() => setModalIsOpen(true)}>
            Delete Account
          </Button>
        </Form>
      </div>
    </Container>
  );
}
