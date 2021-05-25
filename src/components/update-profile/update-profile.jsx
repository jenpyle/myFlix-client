import React, { useState } from 'react'; //useState is a react hook
import { deleteUser, putUpdateProfile } from '../../api/api';
import { Container, Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileReq } from '../../actions/actions';
import './update-profile.scss';

export function UpdateProfile(props) {
  const { onLoggedOut } = props;

  const dispatch = useDispatch();
  const [username, setUsername] = useState(''); // assigns an empty string to the username variable—and assigns to the setUsername variable a method to update the username variable
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState();
  const [birthday, setBirthday] = useState('');
  const [checked, setChecked] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const userData = useSelector((state) => state.user);

  const formValidation = (formData, checked) => {
    let isValid = 'valid';
    if (formData.Username.length < 5) isValid = 'Username must be at least 5 characters long';
    if (checked && formData.Password === '') isValid = 'Password cannot be empty';
    if (formData.Email.includes('.') === false || formData.Email.includes('@') === false) isValid = 'Email is invalid';
    return isValid;
  };

  const handleSubmit = (e) => {
    const formData = {};
    username ? (formData.Username = username) : (formData.Username = userData.Username);
    if (checked) formData.Password = password;
    email ? (formData.Email = email) : (formData.Email = userData.Email);
    birthday ? (formData.Birthday = birthday) : (formData.Birthday = userData.Birthday.substr(0, 10));

    let isValid = formValidation(formData, checked);
    let urlString = `https://jennysflix.herokuapp.com/users/${userData.Username}`;

    if (checked) urlString = `https://jennysflix.herokuapp.com/users/${userData.Username}/password`;

    isValid === 'valid' ? putUpdateProfile(urlString, formData).then(dispatch(setProfileReq(''))) : alert(isValid);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    let urlString = `https://jennysflix.herokuapp.com/users/${userData.Username}`;
    deleteUser(urlString).then((response) => {
      alert(response);
    });
  };

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
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
      <Modal show={modalIsOpen} onHide={setModalIsOpenToFalse}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Account cannot be recovered after deregistering</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={setModalIsOpenToFalse}>
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
              // autoComplete="birthday"
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
              dispatch(setProfileReq(''));
            }}
          >
            Back
          </Button>
          <Button variant="danger" type="button" onClick={setModalIsOpenToTrue}>
            Delete Account
          </Button>
        </Form>
      </div>
    </Container>
  );
}
// export default connect(mapStateToProps, { setUser })(UpdateProfile);
