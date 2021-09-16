import React, { useState } from 'react'; //useState is a react hook
import { Container, Button, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../actions/actions';

import { postRegistration } from '../../api/api';
import './registration-view.scss';

export function RegistrationView(props) {
	//excluding the 'extends React.Component' bc this is a function component, not class component. And can use hooks
	const [username, setUsername] = useState(''); // assigns an empty string to the username variable—and assigns to the setUsername variable a method to update the username variable
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');
	const loading = useSelector((state) => state.loading);
	const dispatch = useDispatch();

	const formValidation = (formData) => {
		let isValid = 'valid';
		if (formData.Username.length < 5) isValid = 'Username must be at least 5 characters long';
		if (formData.Password === '') isValid = 'Password cannot be empty';
		if (formData.Email.includes('.') === false || formData.Email.includes('@') === false) isValid = 'Email is invalid';
		if (formData.Birthday === '') isValid = 'Please enter birthday';

		return isValid;
	};

	const handleSubmit = (e) => {
		e.preventDefault(); //prevents the default refresh/change of the page
		const formData = {};
		formData.Username = username;
		formData.Password = password;
		formData.Email = email;
		formData.Birthday = birthday;

		let isValid = formValidation(formData);

		if (isValid !== 'valid') {
			alert(isValid);
			return;
		}
		if (isValid === 'valid') {
			dispatch(setLoading(true));
			dispatch(postRegistration(formData));
		}
	};

	return (
		<Container className="reg-container">
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

					<Form.Group controlId="formBirthday">
						<Form.Label>Birthday</Form.Label>
						<Form.Control type="date" onChange={(e) => setBirthday(e.target.value)} />
					</Form.Group>
					{loading ? <Spinner animation="border" /> : null}
					<Button variant="info" type="submit" onClick={handleSubmit}>
						Submit
					</Button>
					<Button
						variant="secondary"
						onClick={() => {
							props.onBackClick();
						}}
					>
						Back
					</Button>
				</Form>
			</div>
		</Container>
	);
}
